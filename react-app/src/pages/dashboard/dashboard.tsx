import { Typography, Card, Grid, Tooltip, IconButton, SpeedDial, SpeedDialIcon, LinearProgress, Box, CardContent, CardHeader, CardActionArea, Divider } from "@mui/material";
import { GroupAccordion } from "../../components/accordion/group";
import ReplayIcon from '@mui/icons-material/Replay';
import { Link } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useContext, useEffect, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AnnouncementsCard } from "../../components/cards/Announcements";
import {  useGetAnnouncementsQuery, useGetStatusOfGroupsQuery } from "../../feature/stakit/publicSlice";
import { Announcement, Service, Status } from "../../models/types";
import { Group } from "../../models/group";
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import { Can } from "../../feature/authentication/logic/Can";
import { Operation } from "../../feature/authentication/config/ability";
import { t } from "i18next";
import { Email } from "@mui/icons-material";
import { useGetAllAnnouncementsQuery } from "../../feature/stakit/announcementSlice";



function getStatus(services: Service[]) : Status {
    
    let ok = services.filter(s => s.status == Status.OK).length;
    let patial_not_ok = services.filter(s => s.status == Status.PARTIAL_NOT_OK).length;
    let not_ok = services.filter(s => s.status == Status.NOT_OK).length;
    
    if (not_ok > 0) return Status.NOT_OK
    if (patial_not_ok > 0) return Status.PARTIAL_NOT_OK

    return Status.OK
}

export function DashboardPage() {


    const user = useContext(UserContext)!

    const { data, refetch } = useGetStatusOfGroupsQuery(undefined)
    const { data: announcements, refetch: refetchAnnouncements, isLoading: announcementsIsLoading } = useGetAnnouncementsQuery(undefined);
    
    const groups: Group[] = data ?? []

    const services: Service[] = groups.flatMap(group => group.services.map(service => service as Service))

    const status = getStatus(services)

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <StatusMessage
                        status={status}
                        onRefresh={() => refetch()}
                    />
                    {groups && groups.filter(group => group.display).map((serviceGroup, index) => {
                        return (
                            <GroupAccordion defaultExpanded={serviceGroup.expanded} group={serviceGroup} key={"group_" + index} ></GroupAccordion>
                        )
                    })}
                    <Can ability={user?.getAbility()} I={Operation.READ} a={"public"}>
                        <SubscibeButton />
                    </Can>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <AnnouncementsCard announcements={announcements ?? []} onRefresh={refetchAnnouncements} isLoading={announcementsIsLoading} divider={<Divider variant={"middle"} />} actions={[]} />
                </Grid>
            </Grid>
        </Box>
    )
}


export function SubscibeButton() {
    return (
        <Link to={"/subscribe"}>
            <Tooltip title="Subscribe">
                <SpeedDial
                    ariaLabel="Subscribe"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon icon={<NotificationsIcon />} openIcon={<NotificationsActiveIcon />} />}
                    FabProps={{
                        sx: {
                            bgcolor: 'secondary.main',
                            '&:hover': {
                                bgcolor: 'secondary.main',
                            }
                        }
                    }}
                >
                </SpeedDial>
            </Tooltip>
        </Link>
    )
}

StatusMessage.defaultProps = {
    level: "info",
}

function StatusMessage(props: { status: Status, refreshRate?: number, onRefresh?: () => void }) {

    const getHeading = (status: Status): JSX.Element => {

        enum Heading {
            WARNING = "Warning",
            ERROR = "Error",
            PERFECT = "Perfect",
            UKNOWN = "Unknown"
        }

        enum Emoji {
            WARNING = '\u{1F622}',
            ERROR = '\u{1F631}',
            PERFECT = '\u{1F973}',
            UKNOWN = '\u{1F914}'
        }

        let msg = Heading.UKNOWN;
        let emoji = Emoji.UKNOWN;

        switch (status) {
            case Status.NOT_OK: { msg = Heading.ERROR; emoji = Emoji.ERROR; break };
            case Status.OK: { msg = Heading.PERFECT; emoji = Emoji.PERFECT; break };
            case Status.PARTIAL_NOT_OK: { msg = Heading.WARNING; emoji = Emoji.WARNING; break };
            case Status.UKNOWN: { msg = Heading.UKNOWN; emoji = Emoji.UKNOWN; break };
            default: { msg = Heading.UKNOWN; emoji = Emoji.UKNOWN; break };
        }

        return <p style={{ margin: 0 }}>{t(msg) + ""} {emoji}</p>
    }

    const getStatusMessage = (status: Status): string => {

        const successMsg = t("All systems works appropriately")
        const warningMSg = t("One or more systems are experiencing problems")
        const errorMsg = t("One or more systems are down")

        switch (status) {
            case Status.NOT_OK: return errorMsg
            case Status.OK: return successMsg
            case Status.PARTIAL_NOT_OK: return warningMSg
            case Status.UKNOWN: return t("Something went wrong")
        }

    }

    const refreshRate = props.refreshRate ?? 60000

    const tickRate = 200

    const [lastRefresh, setLastRefresh] = useState(new Date())

    const [progress, setProgress] = useState(0)


    useEffect(() => {
        const refreshInterval = setInterval(() => {
            refresh()
        }, refreshRate)
        return () => clearInterval(refreshInterval)
    }, [])


    useEffect(() => {
        const tickInterval = setInterval(() => {

            setProgress((prev) => {
                const now = new Date()
                return (prev >= 100 ? 0 : (now.getTime() - lastRefresh.getTime()) / refreshRate) * 100
            })

        }, tickRate)
        return () => clearInterval(tickInterval)
    }, [])


    const refresh = () => {
        if (props.onRefresh) props.onRefresh()
        setLastRefresh((prev) => {
            const last = prev
            last.setTime(new Date().getTime())
            return last
        })
    }
    return (

        <Card>
            <CardActionArea>
                {/* <Tooltip title={"Time to next refresh"}> */}
                <LinearProgress color={"secondary"} variant={"determinate"} value={progress} />
                {/* </Tooltip> */}
            </CardActionArea>
            <CardHeader
                title={getHeading(props.status)}
                subheader={getStatusMessage(props.status)}
                action={
                    <Tooltip title={<>{t("Refresh" + "")}</>}>
                        <IconButton onClick={() => refresh()}>
                            <ReplayIcon></ReplayIcon>
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                <Typography textAlign={"right"}><>{t("Last updated")}:</> {lastRefresh.toLocaleTimeString()}</Typography>
            </CardContent>
        </Card>


    )
}




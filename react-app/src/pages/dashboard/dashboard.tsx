import { Typography, Card, Grid, Tooltip, IconButton, SpeedDial, SpeedDialIcon, LinearProgress, Box, CardContent, CardHeader, CardActionArea, Divider } from "@mui/material";
import { GroupAccordion } from "../../components/accordion/group";
import ReplayIcon from '@mui/icons-material/Replay';
import { Link } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useContext, useEffect, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AnnouncementsCard } from "../../components/cards/Announcements";
import { useGetStatusOfGroupsQuery } from "../../feature/stakit/publicSlice";
import { Service, Status } from "../../models/types";
import { Group } from "../../models/group";
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import { Can } from "../../feature/authentication/logic/Can";
import { Operation } from "../../feature/authentication/config/ability";
import { t } from "i18next";


export function DashboardPage() {


    const user = useContext(UserContext)!

    const { data, refetch } = useGetStatusOfGroupsQuery(undefined)

    const groups: Group[] = data ?? []

    const services: Service[] = groups.flatMap(group => group.services.map(service => service as Service))

    const numberOfServicesDown = services && services.filter((service: Service) => service.status === Status.NOT_OK).length

    const level = numberOfServicesDown === 0 ? "success" : "warning"

    const successMsg = t("All systems works appropriately")

    const warningMsg = t("One or more systems are experiencing problems")

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <StatusMessage
                        level={level}
                        msg={numberOfServicesDown === 0 ? successMsg : warningMsg}
                        callback={() => refetch()}
                    />
                    {groups && groups.filter(group => group.display ).map((serviceGroup, index) => {
                                                console.log(serviceGroup)
                                                return(
                      <GroupAccordion defaultExpanded={serviceGroup.expanded} group={serviceGroup} key={"group_" + index} ></GroupAccordion>
                    )})}
                    <Can ability={user?.getAbility()} I={Operation.READ} a={"public"}>
                        <SubscibeButton />
                    </Can>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <AnnouncementsCard divider={<Divider variant={"middle"}/>} actions={[]} />
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

function StatusMessage(props: { msg: string, level?: "success" | "warning", refreshRate?: number, callback?: () => void }) {

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
        if (props.callback) props.callback()
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
                title={props.level === "success" ? <p style={{ margin: 0 }}>Perfekt &#x1F44D;</p> : <p style={{ margin: 0 }}>Advarsel &#x1F44E;</p>}
                subheader={props.msg}
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




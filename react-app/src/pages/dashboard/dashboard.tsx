import { AlertColor, Typography, Card, Grid, Tooltip, IconButton, SpeedDial, SpeedDialIcon, LinearProgress, Box, CardContent, CardHeader, CardActionArea, Paper } from "@mui/material"
import { GroupAccordion } from "../../components/group"
import { mock } from "../../MockedData"
import ReplayIcon from '@mui/icons-material/Replay';
import { Link } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useEffect, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AnnouncementsCard } from "../../components/cards/Announcements";


export function DashboardPage() {


    const refresh = () => {

    }

    const announcements = mock.announcements

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <StatusMessage
                        level="success"
                        msg="Alle systemer virker hensigtsmæssigt"
                        callback={refresh}
                    />

                    {mock.groups.map(serviceGroup => (
                        <Paper sx={{ mt: 2 }}>
                            <GroupAccordion group={serviceGroup} ></GroupAccordion>
                        </Paper>
                    ))}

                    <Subscibe></Subscibe>

                </Grid>
                <Grid item xs={12} lg={6}>
                    <AnnouncementsCard announcements={announcements}></AnnouncementsCard>
                </Grid>
            </Grid>
        </Box>



    )
}




function Subscibe() {
    return (
        <Link to={"/subscribe"}>
            <Tooltip title="Subscribe">

                <SpeedDial
                    ariaLabel="Subscribe"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
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

function StatusMessage(props: { msg: string, level?: AlertColor, refreshRate?: number, callback?: () => void }) {

    const [loading, setLoading] = useState(false)

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

        <Card
            sx={{ backgroundColor: "warning" }}
        >
            <CardHeader
                title={"Perferkt"}
                action={
                    <Tooltip title="Refresh">
                        <IconButton onClick={() => refresh()}>
                            <ReplayIcon></ReplayIcon>
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={9}>
                        <Typography>{props.msg}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography textAlign={"right"}>Sidst opdateret: {lastRefresh.toLocaleTimeString()}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActionArea>
                <Tooltip title={"Time to next refresh"}>
                    <LinearProgress variant={"determinate"} value={progress} />
                </Tooltip>
            </CardActionArea>
        </Card>


    )
}




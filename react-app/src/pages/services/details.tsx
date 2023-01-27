import { Breadcrumbs, Button, Card, CardContent, CardHeader, Collapse, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Service } from "../../models/types";

import { Loading } from "../../components/feedback/loading";
import { ServiceForm } from "../../components/forms/service";

import EditOffIcon from '@mui/icons-material/EditOff';
import { Delete } from "@mui/icons-material";
import { useDeleteServiceMutation, useGetServiceQuery, useUpdateServiceMutation } from "../../feature/stakit/serviceSlice";
import { DeleteServiceDialog } from "../../components/dialogs/DeleteDialog";

import EditIcon from '@mui/icons-material/Edit';
import { Modes } from "../../components/service";


export function ServiceDetails() {


    const params = useParams();

    const { isLoading, data } = useGetServiceQuery(params.id!)
    const deleteService = useDeleteServiceMutation()[0]
    const editService = useUpdateServiceMutation()[0]



    const service: Service = data! // mock.services[0]

    const location = useLocation();

    const [mode, setMode] = useState<Modes>(location.state?.mode != null ? location.state?.mode : Modes.NORMAL)

    const actions: { title: string, icon: ReactNode, secondaryIcon?: ReactNode, mode: Modes }[] = [
        { title: "Edit", icon: <EditIcon />, secondaryIcon: <EditOffIcon />, mode: Modes.EDIT },
        { title: "Delete", icon: <Delete />, mode: Modes.DELETE }
    ]

    const resetMode = () => setMode(Modes.NORMAL)

    return (


        <>
            <Container sx={{ paddingTop: 4 }}>
                <Card>
                    <Loading loading={isLoading}>
                        <CardHeader
                            title={
                                <Header service={service} showPath></Header>
                            }
                            subheader={service?.description}
                            action={<>
                                {actions.map(action => (

                                    <Tooltip title={action.title}>
                                        <IconButton disabled={mode !== Modes.NORMAL} aria-label={action.title} onClick={() => mode === Modes.NORMAL ? setMode(action.mode) : setMode(Modes.NORMAL)}>
                                            {mode === action.mode ? action.secondaryIcon ?? action.icon : action.icon}
                                        </IconButton>
                                    </Tooltip>
                                ))}
                            </>
                            }
                        />
                        <CardContent>
                            <Collapse in={mode === Modes.EDIT}>
                                <ServiceForm service={service} onCancel={() => setMode(Modes.NORMAL)} onSubmit={async (service) => { editService(service) }}></ServiceForm>
                            </Collapse>
                        </CardContent>
                        <DeleteServiceDialog
                            open={mode === Modes.DELETE}
                            onClose={resetMode}
                            onSuccess={(service) => { deleteService(service); setMode(Modes.NORMAL); }}
                            item={service}
                        />
                    </Loading>
                </Card>
                <HistorySection />
            </Container >


        </>
    )
}




export function Header(props: { service: Service, showPath?: boolean }) {

    const { service } = props

    const paths: { title: string, href: string }[] = []

    paths.push({ title: service.name, href: "/services/" + service.uuid })
    //if (service && service.group) { paths.unshift({ title: service.group.name!, href: "/groups/" + service.group.uuid }) }

    return (
        <>
            {
                props.showPath ?
                    <Breadcrumbs aria-label="breadcrumb">
                        {paths.map((path, index) => {
                            return (
                                <>
                                    {index < paths.length - 1 ?
                                        <Typography
                                            sx={{ ":hover": { textDecoration: "underline" } }}
                                            color={"inherit"}
                                            variant="h6"
                                        >
                                            <Link to={path.href} style={{ textDecoration: 'none', color: "inherit" }}>{path.title}</Link>
                                        </Typography>
                                        :
                                        <Typography color={"text.primary"} variant="h6">{path.title}</Typography>
                                    }
                                </>
                            )
                        })}
                    </Breadcrumbs >
                    :
                    <Typography color={"text.primary"} variant="h6">{service?.name}</Typography>
            }
        </>
    )
}





export function DialogButton(props: { children: React.ReactElement<typeof Button> }) {
    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(false)

    return (
        <>
            <Dialog
                open={open}
                onClose={(handleClose)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            {props.children}

        </>
    )
}

function HistorySection() {
    return (
        <Card sx={{ marginTop: 2 }}>
            <CardHeader title={"History"} subheader={<Typography>The chart below shows the status corrosponding to the last 90 days</Typography>}>
            </CardHeader>
            <CardContent>
                {/* <History days={mock.days.map(day => ({ date: new Date(), percentage: day }))}></History> */}
            </CardContent >
        </Card >
    )
}

interface Day { percentage: number, date: Date }

export function History(props: { days: Day[] }) {

    const Pill = (props: Day) => {

        const GREEN = "#00e6c8"
        const BLUE = "#122A4C"

        const [isMouseOver, setMouseOver] = useState(false)

        const date = props.date;

        return (
            <Tooltip title={
                <>
                    <Typography>{date.toLocaleDateString()}</Typography>
                    <Typography variant="h6">{props.percentage + "%"}</Typography>
                </>} arrow >
                <svg
                    onMouseLeave={() => setMouseOver(false)}
                    onMouseOver={() => setMouseOver(true)}
                    width={12}
                    height={25}
                    fillOpacity={isMouseOver ? 0.5 : props.percentage / 100}
                    fill={isMouseOver ? "#122A4C" : GREEN}
                >
                    <rect x={1} rx="4" ry="4" width={8} height={25} fill="inherit" />
                </svg>
            </Tooltip >
        )
    }

    return (

        <Grid container>
            <Grid item xs={0.5} alignContent={"center"}>
                {/* <Typography>{mock.days.length} %</Typography> */}
            </Grid>
            <Grid item xs={11.5}>
                <Stack direction={"row"}>
                    {props.days.map((day) => {
                        return (
                            <Pill percentage={day.percentage} date={day.date}></Pill>
                        )
                    })}
                </Stack>
            </Grid>
        </Grid>


    )



}

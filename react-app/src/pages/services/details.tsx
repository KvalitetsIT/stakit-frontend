import { Breadcrumbs, Button, Card, CardContent, CardHeader, Collapse, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mock } from "../../MockedData";
import { Service } from "../../models/types";
import EditIcon from '@mui/icons-material/Edit';
import { Loading } from "../../components/feedback/loading";
import { ServiceForm } from "../../components/forms/service";
import EditOffIcon from '@mui/icons-material/EditOff';


import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";



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

export function ServiceDetails() {

    const enum modes {
        NORMAL, EDIT, DELETE
    }

    const params = useParams();

    const [loading, setLoading] = useState(false)

    const service: Service = mock.groups.flatMap(group => group.services).find(service => service.id === parseInt(params.id!))!

    const [mode, setMode] = useState<modes>(modes.NORMAL)


    const actions: { title: string, icon: ReactNode, secondaryIcon?: ReactNode, mode: modes }[] = [
        { title: "Edit", icon: <EditIcon />, secondaryIcon: <EditOffIcon />, mode: modes.EDIT },
        { title: "Delete", icon: <Delete />, mode: modes.DELETE }
    ]

    const resetMode = () => setMode(modes.NORMAL)

    return (
        <>
            <Container sx={{ paddingTop: 4 }}>
                <Card>
                    <Loading loading={loading}>
                        <CardHeader
                            title={
                                <Header service={service} showPath></Header>
                            }
                            subheader={service?.description}
                            action={<>
                                {actions.map(action => (

                                    <Tooltip title={action.title}>
                                        <IconButton disabled={mode !== modes.NORMAL} aria-label={action.title} onClick={() => mode === modes.NORMAL ? setMode(action.mode) : setMode(modes.NORMAL)}>
                                            {mode === action.mode ? action.secondaryIcon ?? action.icon : action.icon}
                                        </IconButton>
                                    </Tooltip>
                                ))}
                            </>
                            }
                        />
                        <CardContent>
                            <Collapse in={mode === modes.EDIT}>
                                <ServiceForm service={service} onCancel={() => setMode(modes.NORMAL)} onSubmit={async () => console.log("Edit")} optionalGroups={mock.groups}></ServiceForm>
                            </Collapse>
                        </CardContent>
                    </Loading>

                </Card>

                <HistorySection />

            </Container >

            <DeleteServiceDialog
                service={service}
                open={mode === modes.DELETE}
                onClose={resetMode}
                onSuccess={() => toast("Deleting service! should redirect to services page...")}
            ></DeleteServiceDialog>
        </>
    )
}


export function DeleteServiceDialog(props: { service: Service, open: boolean, onClose: () => void, onSuccess: () => void }) {
    return (
        <Dialog
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            {...props}
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>You are about to delete the service: {props.service.name}</Typography>
                    <Typography>Do you want to continue?</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>No</Button>
                <Button onClick={props.onSuccess} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}


export function Header(props: { service: Service, showPath?: boolean }) {

    const { service } = props

    const paths: { title: string, href: string }[] = [
        { title: service.group?.name!, href: "/groups/" + service.group?.id },
        { title: service.name, href: "/services/" + service.id }
    ]

    return (
        <>
            {
                props.showPath ?
                    <Path paths={paths}></Path>
                    :
                    <Typography color={"text.primary"} variant="h6">{props.service.name}</Typography>
            }
        </>


    )
}

export function Path(props: { paths: { title: string, href: string }[] }) {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {props.paths.map((path, index) => {
                return (
                    <>
                        {index < props.paths.length - 1 ?
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
    )
}




function HistorySection() {
    return (

        <Card sx={{ marginTop: 2 }}>
            <CardHeader title={"History"} subheader={<Typography>The chart below shows the status corrosponding to the last 90 days</Typography>}>
            </CardHeader>
            <CardContent>
                <History days={mock.days.map(day => ({ date: new Date(), percentage: day }))}></History>
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
                <Typography>{mock.days.length} %</Typography>
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

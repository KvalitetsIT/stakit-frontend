import { Breadcrumbs, Button, Card, CardContent, CardHeader, Collapse, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mock } from "../../MockedData";
import { Announcement, Service } from "../../models/types";
import EditIcon from '@mui/icons-material/Edit';
import { Loading } from "../../components/feedback/loading";
import { ServiceForm } from "../../components/forms/service";
import EditOffIcon from '@mui/icons-material/EditOff';
import { Delete } from "@mui/icons-material";
import { useDeleteServiceMutation, useGetServiceQuery, useUpdateServiceMutation } from "../../feature/api/serviceSlice";
import { DeleteServiceDialog } from "../../components/dialogs/DeleteDialog";



export function ServiceDetails() {

    const enum modes {
        NORMAL, EDIT, DELETE
    }

    const params = useParams();

    const { isLoading, data } = useGetServiceQuery(params.id!)
    const deleteService = useDeleteServiceMutation()[0]
    const editService = useUpdateServiceMutation()[0]


    const [loading, setLoading] = useState(false)

    const service: Service | undefined = data // mock.services[0]



    const [mode, setMode] = useState<modes>(modes.NORMAL)


    const actions: { title: string, icon: ReactNode, secondaryIcon?: ReactNode, mode: modes }[] = [
        { title: "Edit", icon: <EditIcon />, secondaryIcon: <EditOffIcon />, mode: modes.EDIT },
        { title: "Delete", icon: <Delete />, mode: modes.DELETE }
    ]

    const resetMode = () => setMode(modes.NORMAL)

    return (

        service == undefined ?
            <>
                Service == undefined
            </>
            :
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
                                    <ServiceForm service={service} onCancel={() => setMode(modes.NORMAL)} onSubmit={async (service) => { editService(service) }}></ServiceForm>
                                </Collapse>
                            </CardContent>
                        </Loading>
                    </Card>
                    <HistorySection />
                </Container >

                <DeleteServiceDialog
                    open={mode === modes.DELETE}
                    onClose={resetMode}
                    onSuccess={(service) => { deleteService(service); setMode(modes.NORMAL); } } 
                    item={service}
                />
            </>
    )
}




export function Header(props: { service: Service, showPath?: boolean }) {

    const { service } = props

    const paths: { title: string, href: string }[] = []

    paths.push({ title: service.name, href: "/services/" + service.uuid })
    if (service && service.group) { paths.unshift({ title: service.group.name!, href: "/groups/" + service.group.uuid }) }

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

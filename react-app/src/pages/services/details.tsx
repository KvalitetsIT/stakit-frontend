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
import { ServiceCard } from "../../components/cards/Services";
import { Mode } from "../../components/cards/Mode";


export function ServiceDetails() {


    const params = useParams();

    const { isLoading, data } = useGetServiceQuery(params.id!)
   

    const service: Service = data! // mock.services[0]

    return (
        <>
            <Container sx={{ paddingTop: 4 }}>
                <ServiceCard resource={service} isLoading={isLoading}/>
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

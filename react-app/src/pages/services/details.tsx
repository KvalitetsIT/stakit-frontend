import { Breadcrumbs, Card, CardContent, CardHeader, Container, Divider, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { t } from "i18next";
import { Service } from "../../models/types";
import { useGetServiceQuery } from "../../feature/stakit/serviceSlice";
import { ServiceCard } from "../../components/cards/Services";
import { HistoryRangeSelector, StatusHistoryBar, StatusHistoryIncidents, useHistoryRange } from "../../components/history/StatusHistory";


export function ServiceDetails() {

    const params = useParams();

    const { isLoading, data: service } = useGetServiceQuery(params.id!)
    
    return (
        <>
            <Container sx={{ paddingTop: 4 }}>
                <ServiceCard resource={service} isLoading={isLoading} />
                <HistorySection uuid={service?.uuid} />
            </Container >
        </>
    )
}


function HistorySection(props: { uuid?: string }) {

    const [range, setRange] = useHistoryRange()

    return (
        <Card sx={{ marginTop: 2 }}>
            <CardHeader
                title={t("History") as string}
                action={<HistoryRangeSelector value={range} onChange={setRange} />}
            />
            <Divider />
            <CardContent>
                <Stack spacing={3}>
                    <StatusHistoryBar uuid={props.uuid} range={range} />
                    <Stack spacing={1}>
                        <Typography variant="h6">{t("Incidents") as string}</Typography>
                        <StatusHistoryIncidents uuid={props.uuid} range={range} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
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

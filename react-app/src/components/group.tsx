import { Accordion, AccordionSummary, Typography, AccordionDetails, List, Stack, Divider, Chip, Box } from "@mui/material";
import { Service, Status } from "../models/types";
import { ServiceItem } from "./service";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Group } from "../models/group";
import { QuestionMarkOutlined } from "@mui/icons-material";
import { useGetAllServicesQuery } from "../feature/stakit/serviceSlice";

export function GroupAccordion(props: { defaultExpanded?: boolean, group: Group, key?: string }) {


    const serviceIds = props.group.services ?? []

    const { data: allServices, isLoading } = useGetAllServicesQuery(undefined)

    const services: Service[] = (allServices && allServices.filter((service: Service) => service.uuid && serviceIds.includes(service.uuid))) ?? []

    const up: number = services.filter(service => service.status === Status.OK).length

    const actions: { name: string, callback: () => void }[] = [{ name: "Edit", callback: () => { } }, { name: "Edit", callback: () => { } }, { name: "Details", callback: () => { } }, { name: "Delete", callback: () => { } }]

    return (


        <Accordion disableGutters defaultExpanded={props.defaultExpanded} sx={{ marginTop: 2 }} disabled={services.length <= 0}>
            <AccordionSummary>
                <Stack direction={"row"} justifyContent="space-between" alignItems="stretch" width={"100%"}>
                    <Stack>
                        <Typography variant="h6">{props.group.name}</Typography>
                        <Typography>{props.group.description}</Typography>
                    </Stack>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Chip
                            avatar={services.length == 0 ? <QuestionMarkOutlined/>: services.every(service => service.status === Status.OK) ? <CheckCircleIcon color="success" /> : <CancelIcon color="warning" />}
                            color={services.length === 0 ? "default" : up !== services.length ? "error" : "success"}
                            label={<Typography>{up} / {services.length}</Typography>}
                        />
                    </Box>
                </Stack>
                {/* 
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={10}>
                        <Stack>
                            <Typography variant="h6">{props.group.name}</Typography>
                            <Typography>{props.group.description}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={2}>
                        <Chip
                            avatar={services.every(service => service.status === Status.OK) ? <CheckCircleIcon color="success" /> : <CancelIcon color="warning" />}
                            color={services.length === 0 ? "default" : up !== services.length ? "error" : "success"}
                            label={<Typography>{up} / {services.length}</Typography>}
                        />
                    </Grid>
                </Grid> */}

            </AccordionSummary>
            {
                services.length > 0 && (
                    <>
                        <Divider />
                        <AccordionDetails sx={{ padding: 0 }}>
                            <List>
                                {services.map(service => (
                                    <ServiceItem
                                        service={service}
                                    ></ServiceItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </>
                )
            }
        </Accordion>


    )
}


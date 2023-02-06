import { Accordion, AccordionSummary, Typography, AccordionDetails, List, Stack, Divider, Chip, Box } from "@mui/material";
import { Service, Status } from "../models/types";
import { ServiceItem } from "./service";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Group } from "../models/group";
import { QuestionMarkOutlined } from "@mui/icons-material";
import { server } from "typescript";
import { useGetAllServicesQuery, useGetServiceQuery } from "../feature/stakit/serviceSlice";


function getServices(groupServices: string[] | Service[], allServices: Service[]) : Service[]{

    if(typeof groupServices[0] === "string") {

        const services = new Map<string, Service>()

        allServices?.forEach(service => services.set(service.uuid!, service))
        
        return (groupServices as string[]).map(id => services.get(id)).filter((service): service is Service  => !!service)

    }
    return groupServices.map(service => { return service as Service})
    
}


export function GroupAccordion(props: { defaultExpanded?: boolean, group: Group, key?: string }) {


    const groupServices: string[] | Service[] = props.group.services ?? []

    // Check if the groupServices are string or an actual service 
    // if it is an array of strings map them into Services 
    // otherwise do nothing 


    const {data: allServices} = useGetAllServicesQuery(undefined)

    const services = getServices(groupServices, allServices!) // Could result in failures

    const up: number = services.filter(service => service.status === Status.OK).length

    //const actions: { name: string, callback: () => void }[] = [{ name: "Edit", callback: () => { } }, { name: "Edit", callback: () => { } }, { name: "Details", callback: () => { } }, { name: "Delete", callback: () => { } }]

    return (

        <Accordion disableGutters defaultExpanded={props.defaultExpanded} sx={{ marginTop: 2, borderRadius: 1}} disabled={services.length <= 0}>
            <AccordionSummary >
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


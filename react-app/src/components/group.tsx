import { Accordion, AccordionSummary, Typography, AccordionDetails, List, Grid, Stack, Divider, IconButton, Menu, MenuItem, AccordionActions, ListItemAvatar, Chip, Tooltip, Box } from "@mui/material";
import { Status } from "../models/types";
import { ServiceItem } from "./service";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { User } from "../models/types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Group } from "../models/group";
import { PowerInputSharp } from "@mui/icons-material";

export function GroupAccordion(props: { defaultExpanded?: boolean, group: Group, key?: string }) {


    const services = props.group.services ?? []

    const up = services.filter(service => service.status === Status.OK).length

    const actions: { name: string, callback: () => void }[] = [{ name: "Edit", callback: () => { } }, { name: "Edit", callback: () => { } }, { name: "Details", callback: () => { } }, { name: "Delete", callback: () => { } }]

    const user: User | undefined = { firstName: "bob" }

    return (


        <Accordion disableGutters defaultExpanded={props.defaultExpanded} sx={{ marginTop: 2 }}>
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
                            avatar={services.every(service => service.status === Status.OK) ? <CheckCircleIcon color="success" /> : <CancelIcon color="warning" />}
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


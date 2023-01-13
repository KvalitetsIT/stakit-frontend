import { Accordion, AccordionSummary, Typography, AccordionDetails, List, Grid, Stack, Divider, IconButton, Menu, MenuItem, AccordionActions } from "@mui/material";
import { Group, Status } from "../models/types";
import { ServicePreview } from "./service";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { User } from "../models/types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export function GroupAccordion(props: { defaultExpanded?: boolean, group: Group }) {


    const services = props.group.services ?? []

    const down = services.filter(service => service.status === Status.OK).length

    const actions: { name: string, callback: () => void }[] = [{ name: "Edit", callback: () => { } }, { name: "Edit", callback: () => { } }, { name: "Details", callback: () => { } }, { name: "Delete", callback: () => { } }]

    const user: User | undefined = { firstName: "bob" }

    return (


        <Accordion disableGutters defaultExpanded={props.defaultExpanded} sx={{ marginTop: 2 }}>
            <AccordionSummary>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={11}>
                        <Stack>
                            <Typography variant="h6">{props.group.name}</Typography>
                            <Typography>{props.group.description}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>{down} / {services.length}</Typography>
                    </Grid>
                </Grid>
                <AccordionActions >
                    {services.every(service => service.status === Status.OK) ? <CheckCircleIcon color="success" /> : <CancelIcon color="warning" />}
                </AccordionActions>


            </AccordionSummary>
            <Divider />
            <AccordionDetails sx={{ padding: 0 }}>
                <List>
                    {services.map(service => (
                        <ServicePreview
                            service={service}
                        ></ServicePreview>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>


    )
}


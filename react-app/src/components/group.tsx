import { Accordion, AccordionSummary, Typography, AccordionDetails, List, Grid, Stack, Divider, IconButton, Menu, MenuItem, AccordionActions } from "@mui/material";
import { Group, Status } from "../models/types";
import { ServicePreview } from "./service";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { User } from "../models/types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export function GroupAccordion(props: { defaultExpanded?: boolean, group: Group }) {

    const down = props.group.services.filter(service => service.status === Status.UP).length

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
                        <Typography>{down} / {props.group.services.length}</Typography>
                    </Grid>
                </Grid>
                <AccordionActions >
                    {props.group.services.every(service => service.status === Status.UP) ? <CheckCircleIcon color="success" /> : <CancelIcon color="warning" />}
                </AccordionActions>


            </AccordionSummary>
            <Divider />
            <AccordionDetails sx={{ padding: 0 }}>
                <List>
                    {props.group.services.map(service => (
                        <ServicePreview
                            service={service}
                        ></ServicePreview>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>


    )
}


function MenuDropdown(props: { actions: { name: string, callback: () => void }[] }) {

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const open = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(event.currentTarget);
    };
    const close = () => setAnchor(null)

    return (
        <>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-group"
                aria-haspopup="true"
                onClick={open}
                onMouseLeave={close}
                onMouseEnter={open}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="menu-group"
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchor)}

                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                {props.actions.map((action) => (
                    <MenuItem key={action.name} onClick={() => { close(); action.callback() }}>
                        <Typography textAlign="center">{action.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}
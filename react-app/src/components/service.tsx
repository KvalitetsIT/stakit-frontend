import { Delete } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemText, IconButton, Tooltip, Avatar, ListItemAvatar, Grid } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Service } from "../models/types";
import { DeleteServiceDialog, Header } from "../pages/services/details";
import { StatusIcon } from "./status";

import EditIcon from '@mui/icons-material/Edit';
import { useDeleteServiceMutation, useGetAllServiceQuery } from "../feature/api/serviceSlice";

export function ServicePreview(props: { service: Service, showActions?: boolean, showPath?: boolean }) {

    enum Modes {
        NORMAL, DELETE, Edit
    }

    const [mode, setMode] = useState<Modes>(Modes.NORMAL)

    const resetMode = () => {
        setMode(Modes.NORMAL)
    }

    const deleteService = useDeleteServiceMutation()[0]
    const serviceGetter = useGetAllServiceQuery(undefined)

    const remove = () => {
        deleteService(props.service).then(
            serviceGetter.refetch
        )
        setMode(Modes.NORMAL)
    }

    const Actions = () => (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Tooltip title={"Delete"}>
                        <IconButton edge="end" aria-label="Delete" onClick={() => setMode(Modes.DELETE)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title={"Edit"}>
                        <Link to={"/services/" + props.service.uuid + "/edit"}>
                            <IconButton edge="end" aria-label="Edit" onClick={() => setMode(Modes.Edit)}>
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Grid>

            </Grid>
        </>
    )

    return (
        <>
            <ListItem
                key={"item_" + props.service.uuid}
                disablePadding
                secondaryAction={<Actions />}
            >
                <ListItemButton dense>
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={"/services/" + props.service.uuid}>

                        {/* <ListItemAvatar>
                            <Avatar>
                                <StatusIcon status={props.service.status} ></StatusIcon>
                            </Avatar>
                        </ListItemAvatar> */}

                        <ListItemText
                            primary={<Header {...props} />}
                            secondary={props.service.description?.slice(0, 100).trim() + (props.service.description?.length! > 100 ? "..." : ".")}
                        />
                    </Link>

                </ListItemButton>
            </ListItem>
            
            <DeleteServiceDialog
                open={mode === Modes.DELETE}
                item={props.service}
                onSuccess={remove}
                onClose={resetMode}
            />

        </>

    )
}

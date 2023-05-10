import { ListItem, ListItemText, Typography, Box, IconButton, Icon, Tooltip } from "@mui/material";
import { Announcement, Resource } from "../../models/types";
import { ReactElement } from "react";
import { AnnouncementActions } from "../cards/Announcements";



export function AnnouncementItem(props: { announcement: Announcement; actions: ReactElement<typeof AnnouncementActions>; }) {
    return (
        <>
            <ResourceItem
                primary={<Typography fontWeight={"bold"}>{props.announcement.subject}</Typography>}
                secondary={<Typography style={{ whiteSpace: 'pre-line' }}>{props.announcement.message}</Typography>}
                resource={props.announcement} actions={props.actions} 
            />
            <ListItem
                key={"item_" + props.announcement.uuid}
                secondaryAction={<Box marginRight={1}>{props.actions}</Box>}
            
            />
        </>
    );
}


interface ResourceItemActionProps<T> {
    resource: T
    title?: string
    onClick?: (resource: T) => void
    icon?: ReactElement<typeof Icon>
}

export function ResourceItemAction(props: ResourceItemActionProps<Resource>) {
    const { icon, title, resource, onClick } = props;
    return (
        <>
            <Tooltip title={title}>
                <IconButton onClick={() => onClick && onClick(resource)}>
                    {icon}
                </IconButton>
            </Tooltip>
        </>
    )
}

interface ResourceItemProps {
    primary?: JSX.Element,
    secondary?: JSX.Element,
    resource: Resource;
    actions: ReactElement<typeof AnnouncementActions>;
}

export function ResourceItem(props: ResourceItemProps) {
    const { resource, primary, secondary } = props;
    return (
        <>
            <ListItem
                key={"item_" + resource.uuid}
                secondaryAction={<Box marginRight={1}>{props.actions}</Box>}
            >
                <ListItemText
                    primary={<Typography fontWeight={"bold"}>{primary}</Typography>}
                    secondary={<Typography style={{ whiteSpace: 'pre-line' }}>{secondary}</Typography>} />
            </ListItem>
        </>
    );
}


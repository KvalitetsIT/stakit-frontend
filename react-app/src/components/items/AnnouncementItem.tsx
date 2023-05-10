import { ListItem, ListItemText, Typography, Box } from "@mui/material";
import { Announcement } from "../../models/types";
import { ReactElement } from "react";
import { AnnouncementActions } from "../cards/Announcements";



export function AnnouncementItem(props: { announcement: Announcement; actions: ReactElement<typeof AnnouncementActions>; }) {

    const { announcement } = props;

    return (
        <>
            <ListItem
                key={"item_" + announcement.uuid}
                secondaryAction={<Box marginRight={1}>{props.actions}</Box>}
            >
                <ListItemText
                    primary={<Typography fontWeight={"bold"}>{announcement.subject}</Typography>}
                    secondary={<Typography style={{ whiteSpace: 'pre-line' }}>{announcement.message}</Typography>} />
            </ListItem>

        </>
    );
}


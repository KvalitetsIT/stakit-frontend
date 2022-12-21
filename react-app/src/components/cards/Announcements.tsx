import { Card, CardHeader, CardContent, List, ListItemButton, ListItem, ListItemText } from "@mui/material"
import { Link } from "react-router-dom"
import { Announcement } from "../../models/types"


interface AnnouncementsCardProps {
    title?: string
    subTitle?: string
    announcements: Announcement[]
}

AnnouncementsCard.defaultProps = {
    title: "Announcements",
    subTitle: "some subtitle",
    announcements: [],
}

export function AnnouncementsCard(props: AnnouncementsCardProps) {

    const { title, subTitle, announcements } = props

    const Actions = () => (
        <>actions</>
    )


    const Item = (props: { announcement: Announcement }) => {

        const { announcement } = props

        const Actions = () => (
            <>Actions</>
        )

        return (
            <ListItem
                key={"item_" + announcement.id}
                disablePadding
                secondaryAction={<Actions />}
            >
                <ListItemButton dense>
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to={"/services/" + announcement.id}>
                        <ListItemText
                            primary={"primary"}
                            secondary={"secondary"}
                        />
                    </Link>

                </ListItemButton>
            </ListItem>
        )
    }


    return (
        <>
            <Card>
                <CardHeader
                    title={title}
                    subheader={subTitle}
                    action={<Actions></Actions>}
                ></CardHeader>
                <CardContent>
                    <List>
                        {announcements.map(announcement => (
                            <Item announcement={announcement}></Item>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </>
    )
}



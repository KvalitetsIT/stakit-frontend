import { Card, CardHeader, CardContent, List, ListItemButton, ListItem, ListItemText, IconButton, Tooltip, Collapse } from "@mui/material"
import { Link } from "react-router-dom"
import { Announcement } from "../../models/types"
import ReplayIcon from '@mui/icons-material/Replay';
import { toast } from "react-toastify";
import { Add, Delete } from "@mui/icons-material";
import { Action } from "../input/actions/Action";
import { useGetAllAnnouncementsQuery } from "../../feature/api/publicSlice";
import { Loading } from "../feedback/loading";
import { AnnouncementForm } from "../forms/announcement";
import { useState } from "react";
import { modes } from "../../pages/services/ServicesPage";
import { useCreateAnnouncementMutation } from "../../feature/api/announcementSlice";


interface AnnouncementsCardProps {
    title?: string
    subTitle?: string
    announcements?: Announcement[]
}

AnnouncementsCard.defaultProps = {
    title: "Announcements",
    subTitle: "some subtitle",
}

export function AnnouncementsCard(props: AnnouncementsCardProps) {

    const { title, subTitle } = props

    const { isError, isLoading, isSuccess, isUninitialized, isFetching, data, refetch } = useGetAllAnnouncementsQuery(undefined)
    const create = useCreateAnnouncementMutation()
    

    const [mode, setMode] = useState<modes>(modes.NORMAL)

    const refresh = () => {
        toast("Refresh")
    }

    const Actions = () => (
        <>
            <Action title="Refresh" icon={<Add />} onClick={() => setMode(modes.ADD)} />
            <Action title="Refresh" icon={<ReplayIcon />} onClick={() => refetch()} />
        </>
    )

    const Item = (props: { announcement: Announcement }) => {

        const { announcement } = props

        const Actions = () => (
            <>

                <Tooltip title="Refresh">
                    <IconButton onClick={() => refresh()}>
                        <Delete></Delete>
                    </IconButton>
                </Tooltip>
            </>
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
                <Collapse in={mode === modes.ADD}>
                    <CardContent>
                        <AnnouncementForm
                            onSubmit={async (sub) => {
                                await create[0](sub)
                                setMode(modes.NORMAL)
                            }}
                            onCancel={() => {
                                setMode(modes.NORMAL)
                            }}
                        />
                    </CardContent>
                </Collapse>
                <CardContent>
                    <Loading loading={isLoading}>
                        <List>
                            {data && data.map((announcement: Announcement) => (
                                <Item announcement={announcement}></Item>
                            ))}
                        </List>
                    </Loading>

                </CardContent>
            </Card>
        </>
    )
}



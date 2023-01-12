import { Card, CardHeader, CardContent, List, ListItemButton, ListItem, ListItemText, IconButton, Tooltip, Collapse, Grid, Typography } from "@mui/material"
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
import { useCreateAnnouncementMutation, useDeleteAnnouncementMutation } from "../../feature/api/announcementSlice";
import { DeleteAnnouncementDialog, DeleteServiceDialog } from "../../pages/services/details";


interface AnnouncementsCardProps {
    title?: string
    subTitle?: string
}

AnnouncementsCard.defaultProps = {
    title: "Announcements",
    subTitle: "some subtitle",
}

export function AnnouncementsCard(props: AnnouncementsCardProps) {

    const { title, subTitle } = props

    const { isError, isLoading, isSuccess, isUninitialized, isFetching, data, refetch } = useGetAllAnnouncementsQuery(undefined)
    const create = useCreateAnnouncementMutation()
    const deleteAnnouncement = useDeleteAnnouncementMutation()[0]

    const [mode, setMode] = useState<modes>(modes.NORMAL)

    const Actions = () => (
        <>
            <Action title="Refresh" icon={<Add />} onClick={() => setMode(modes.ADD)} />
            <Action title="Refresh" icon={<ReplayIcon />} onClick={() => refetch()} />
        </>
    )


    const Item = (props: { announcement: Announcement }) => {

        const { announcement } = props

        const remove = () => {
            deleteAnnouncement(announcement)
            setMode(modes.NORMAL)
        }

        const Actions = () => (
            <>
                <Tooltip title="Refresh">
                    <IconButton onClick={() => setMode(modes.DELETE)}>
                        <Delete></Delete>
                    </IconButton>
                </Tooltip>
            </>
        )
        return (
            <>
                <ListItem
                    key={"item_" + announcement.uuid}
                    disablePadding
                    secondaryAction={<Actions />}
                >
                    <ListItemButton>
                        <ListItemText
                            primary={
                                <>
                                    <Typography fontWeight={"bold"}>{announcement.subject}</Typography>
                                    <Typography>{announcement.message}</Typography>
                                </>
                            }
                            secondary={<>
                                <Typography>{dateToText(new Date(announcement.to_datetime!))} - {dateToText(new Date(announcement.from_datetime!))}</Typography>
                            </>}
                        />
                    </ListItemButton>
                </ListItem>

                <DeleteAnnouncementDialog 
                    onClose={() => setMode(modes.NORMAL)}
                    onSuccess={() => remove()}
                    item={announcement} 
                    open={mode == modes.DELETE}
                />
            </>

        )
    }

    const dateToText = (date: Date): string => {
        return date.toLocaleDateString() + " " + date.toLocaleTimeString()
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
                        {
                            data ? (
                                <List>
                                    {data.map((announcement: Announcement) => (
                                        <Item announcement={announcement}></Item>
                                    ))}
                                </List>
                            ) : (<>No announcements to show</>)
                        }
                    </Loading>

                </CardContent>
            </Card>
        </>
    )
}



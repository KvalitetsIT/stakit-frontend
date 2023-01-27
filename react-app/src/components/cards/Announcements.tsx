import { Card, CardHeader, CardContent, List, ListItemButton, ListItem, ListItemText, IconButton, Tooltip, Collapse, Typography } from "@mui/material";
import { Announcement } from "../../models/types";
import ReplayIcon from '@mui/icons-material/Replay';
import { Add, Delete } from "@mui/icons-material";
import { Action } from "../input/actions/Action";
import { useGetAllAnnouncementsQuery } from "../../feature/stakit/publicSlice";
import { Loading } from "../feedback/loading";
import { AnnouncementForm } from "../forms/announcement";
import { useContext, useState } from "react";
import { Mode } from "../../pages/services/ServicesPage";
import { useCreateAnnouncementMutation, useDeleteAnnouncementMutation } from "../../feature/stakit/announcementSlice";
import { DeleteAnnouncementDialog } from "../dialogs/DeleteDialog";
import { Can } from "@casl/react";
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import { Operation } from "../../feature/authentication/config/ability";


interface AnnouncementsCardProps {
    title?: string
    subTitle?: string
}

AnnouncementsCard.defaultProps = {
    title: "Announcements",
    subTitle: "A list of the latest announcenements",
}

export function AnnouncementsCard(props: AnnouncementsCardProps) {

    const { title, subTitle } = props

    const { isError, isLoading, isSuccess, isUninitialized, isFetching, data, refetch } = useGetAllAnnouncementsQuery(undefined)
    const create = useCreateAnnouncementMutation()
    const deleteAnnouncement = useDeleteAnnouncementMutation()[0]

    const [mode, setMode] = useState<Mode>(Mode.NORMAL)
    
    const loggedInAs = useContext(UserContext)

    const Actions = () => (
        <>
            <Action title="Refresh" icon={<Add />} onClick={() => setMode(Mode.ADD)} />

            <Can ability={loggedInAs!.getAbility()} I={Operation.READ} a={Announcement}>
                <Action title="Refresh" icon={<ReplayIcon />} onClick={() => refetch()} />
            </Can>
        </>
    )


    const Item = (props: { announcement: Announcement }) => {

        const { announcement } = props

        const remove = (a: Announcement) => {
            deleteAnnouncement(a)
            setMode(Mode.NORMAL)
        }

        const Actions = () => (
            <>
                <Tooltip title="Refresh">
                    <IconButton onClick={() => setMode(Mode.DELETE)}>
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
                                <Typography>{dateToText(new Date(announcement.from_datetime!))} - {dateToText(new Date(announcement.to_datetime!))}</Typography>
                            </>}
                        />
                    </ListItemButton>
                </ListItem>

                <DeleteAnnouncementDialog
                    onClose={() => setMode(Mode.NORMAL)}
                    onSuccess={() => { console.log("announcement", announcement); return remove(announcement) }}
                    item={announcement}
                    open={mode == Mode.DELETE}
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
                <Collapse in={mode === Mode.ADD}>
                    <CardContent sx={{ padding: 2 }}>
                        <AnnouncementForm
                            onSubmit={async (sub) => {
                                await create[0](sub)
                                setMode(Mode.NORMAL)
                            }}
                            onCancel={() => {
                                setMode(Mode.NORMAL)
                            }}
                        />
                    </CardContent>
                </Collapse>
                <CardContent sx={{ padding: 0 }}>
                    <Loading loading={isLoading}>
                        {
                            data ? (
                                <List>
                                    {data.map((announcement: Announcement) => (
                                        <Item announcement={announcement}></Item>
                                    ))}
                                </List>
                            ) : (<Typography marginLeft={2}></Typography>)
                        }
                    </Loading>

                </CardContent>
            </Card>
        </>
    )
}



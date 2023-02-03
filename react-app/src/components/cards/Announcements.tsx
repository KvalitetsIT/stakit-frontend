import { Card, CardHeader, CardContent, List, ListItemButton, ListItem, ListItemText, IconButton, Tooltip, Collapse, Typography, CardActionArea, LinearProgress } from "@mui/material";
import { Announcement } from "../../models/types";
import ReplayIcon from '@mui/icons-material/Replay';
import { Add, Delete, Refresh } from "@mui/icons-material";
import { Action } from "../input/actions/Action";
import { useGetAllAnnouncementsQuery } from "../../feature/stakit/publicSlice";
import { AnnouncementForm } from "../forms/announcement";
import { useContext, useState } from "react";
import { Mode } from "./Mode";
import { useCreateAnnouncementMutation, useDeleteAnnouncementMutation } from "../../feature/stakit/announcementSlice";
import { DeleteAnnouncementDialog } from "../dialogs/DeleteDialog";
import { Can } from "@casl/react";
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import { Operation } from "../../feature/authentication/config/ability";
import { Link } from "react-router-dom";
import { ResourceCard, ResourceCardProps, ResourcesCard } from "./ResourceCard";


interface AnnouncementCardProps extends ResourceCardProps<Announcement> { }

export function AnnouncementCard(props: AnnouncementCardProps) {
    const [mode, setMode] = useState(props.mode ?? Mode.NORMAL)
    const remove = useDeleteAnnouncementMutation()[0]
    
    const {resource: announcement} = props

    return (
        <ResourceCard
            header={props.resource?.subject ?? ""}
            subHeader={<>{dateToText(new Date(announcement?.from_datetime!))} - {dateToText(new Date(announcement?.to_datetime!))}</> ?? ""}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            onDelete={(announcement) => remove(announcement)}
            renderForm={() => (
                <AnnouncementForm
                    onSubmit={async (submission: Announcement) => {
                        props.onUpdate && props.onUpdate(submission)
                    }}
                    onCancel={() => setMode(Mode.NORMAL)}
                    announcement={props.resource ?? undefined}
                />
            )}
            {...props}
        />
    )
}

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

    const { isLoading, data, refetch } = useGetAllAnnouncementsQuery(undefined)
    const create = useCreateAnnouncementMutation()
    const deleteAnnouncement = useDeleteAnnouncementMutation()[0]

    const [mode, setMode] = useState<Mode>(Mode.NORMAL)

    const reload = () => {refetch(); console.log("reloading")}

    const Actions = () => <></>
    
    const Item = (props: { announcement: Announcement }) => {

        const { announcement } = props

        return (

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

        )
    }


    return (
        <ResourcesCard
            onRefresh={() => reload()}
            isLoading={isLoading}
            mode={mode}
            header={"Announcements"}
            subHeader={"A list of the latest announcenements"}
            onModeChange={(x) => setMode(x)}
            resources={data!}
            renderForm={() => <AnnouncementForm
                onSubmit={async (sub) => {
                    await create[0](sub);
                    setMode(Mode.NORMAL);
                }}
                onCancel={() => {
                    setMode(Mode.NORMAL);
                }} />}
            renderItem={(item) => <Item announcement={item}></Item>}
            extractKey={(announcement: Announcement, index) => "announcement_" + index}
            extractPath={(announcement) => "/announcements/" + announcement.uuid}
        />
    )
}



const dateToText = (date: Date): string => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

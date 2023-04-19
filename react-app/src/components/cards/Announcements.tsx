import { ListItemButton, ListItem, ListItemText, Typography } from "@mui/material";
import { Announcement } from "../../models/types";
import { useGetAllAnnouncementsQuery } from "../../feature/stakit/publicSlice";
import { AnnouncementForm } from "../forms/announcement";
import { useState } from "react";
import { Mode } from "./Mode";
import { useCreateAnnouncementMutation, useDeleteAnnouncementMutation } from "../../feature/stakit/announcementSlice";
import { DeleteAnnouncementDialog } from "../dialogs/DeleteDialog";
import { ResourceCard, ResourceCardProps, ResourcesCard } from "./ResourceCard";
import { t } from "i18next";
import { Action } from "./BaseCard";
import { useKeycloak } from "@react-keycloak/web";


interface AnnouncementCardProps extends ResourceCardProps<Announcement> { }

export function AnnouncementCard(props: AnnouncementCardProps) {
    const [mode, setMode] = useState(props.mode ?? Mode.NORMAL)
    const remove = useDeleteAnnouncementMutation()[0]
    const { resource: announcement } = props
    const { refetch } = useGetAllAnnouncementsQuery(undefined)

    return (
        <ResourceCard
            header={props.resource?.subject ?? ""}
            subHeader={<>{dateToText(new Date(announcement?.from_datetime!))} - {dateToText(new Date(announcement?.to_datetime!))}</> ?? ""}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            onDelete={(announcement) => remove(announcement)}
            renderContent={<Typography style={{ whiteSpace: 'pre-line' }}>{announcement?.message}</Typography>}
            renderForm={() => (
                <AnnouncementForm
                    onSubmit={async (submission: Announcement) => {
                        props.onUpdate && props.onUpdate(submission)
                    }}
                    onCancel={() => setMode(Mode.NORMAL)}
                    announcement={props.resource ?? undefined}
                />
            )}
            deleteDialog={
                <DeleteAnnouncementDialog
                    item={announcement}
                    open={mode === Mode.DELETE}
                    onClose={function (): void {
                        setMode(Mode.NORMAL)
                    }}
                    onSuccess={function (item: Announcement): void {
                        remove(item)
                        refetch()
                        window.history.go(-1)
                    }} />
            }
            {...props}
        />
    )
}

interface AnnouncementsCardProps {
    actions?: Action[]
}

AnnouncementsCard.defaultProps = {
    header: t("Announcements"),
    subHeader: t("A list of the latest announcenements"),
}

export function AnnouncementsCard(props: AnnouncementsCardProps) {

    const { isLoading, data, refetch } = useGetAllAnnouncementsQuery(undefined)
    const create = useCreateAnnouncementMutation()
    const deleteAnnouncement = useDeleteAnnouncementMutation()[0]
    const [mode, setMode] = useState<Mode>(Mode.NORMAL)
    const reload = () => { refetch(); console.log("reloading") }
    const Actions = () => <></>

    const AnnouncementItem = (props: { announcement: Announcement }) => {

        const { announcement } = props

        return (
            <>
                <ListItem
                    key={"item_" + announcement.uuid}
                    secondaryAction={<Actions />}
                >
                    <ListItemText
                        primary={
                            <>
                                <Typography fontWeight={"bold"}>{announcement.subject}</Typography>
                                <Typography style={{ whiteSpace: 'pre-line' }}>{announcement.message}</Typography>
                            </>
                        }
                        secondary={<>
                            <Typography>{dateToText(new Date(announcement.from_datetime!))} - {dateToText(new Date(announcement.to_datetime!))}</Typography>
                        </>}
                    />

                </ListItem>

            </>
        )
    }

    const keycloak = useKeycloak()
    const authenticated = keycloak.initialized && keycloak.keycloak.authenticated

    return (
        <ResourcesCard
            disableLinks={!authenticated}
            onRefresh={() => reload()}
            isLoading={isLoading}
            mode={mode}
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
            renderItem={(item) => <AnnouncementItem announcement={item}></AnnouncementItem>}
            extractKey={(announcement: Announcement, index) => "announcement_" + index}
            extractPath={(announcement) => "/announcements/" + announcement.uuid}
            {...props}
        />
    )
}



const dateToText = (date: Date): string => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

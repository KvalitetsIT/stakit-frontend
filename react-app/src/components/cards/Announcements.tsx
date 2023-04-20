import { ListItemButton, ListItem, ListItemText, Typography, Divider, IconButton, Link, Tooltip, Box } from "@mui/material";
import { Announcement } from "../../models/types";
import { useGetAllAnnouncementsQuery } from "../../feature/stakit/publicSlice";
import { AnnouncementForm } from "../forms/announcement";
import { useContext, useState } from "react";
import { Mode } from "./Mode";
import { useCreateAnnouncementMutation, useDeleteAnnouncementMutation } from "../../feature/stakit/announcementSlice";
import { DeleteAnnouncementDialog } from "../dialogs/DeleteDialog";
import { ResourceCard, ResourceCardProps, ResourcesCard } from "./ResourceCard";
import { t } from "i18next";
import { Action } from "./BaseCard";
import { useKeycloak } from "@react-keycloak/web";
import { Can } from "@casl/react";
import { Operation, Asset } from "../../feature/authentication/config/ability";
import { Modes } from "../service";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { UserContext } from "../../feature/authentication/logic/FetchUser";

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
    divider?: JSX.Element
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
    const reload = () => { refetch() }




    const AnnouncementItem = (props: { announcement: Announcement, onCopy?: (announcement: Announcement) => void }) => {

        const { announcement } = props

        const user = useContext(UserContext)!
        const keycloak = useKeycloak()

        const Actions = () => (
            <>
                <Can ability={user?.getAbility()} I={Operation.READ} a={Asset.RESOURCE}>
                    <Tooltip title={<>{t("Copy")}</>}>
                        <IconButton edge="end" onClick={() => props.onCopy && props.onCopy(announcement)}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Tooltip>
                </Can>

            </>
        )


        return (
            <>
                <ListItem
                    key={"item_" + announcement.uuid}
                    secondaryAction={<Box marginRight={1}><Actions /></Box>}
                >
                    <ListItemText
                        primary={<Typography fontWeight={"bold"}>{announcement.subject}</Typography>}
                        secondary={<Typography style={{ whiteSpace: 'pre-line' }}>{announcement.message}</Typography>}
                    />

                </ListItem>

            </>
        )
    }

    const keycloak = useKeycloak()
    const authenticated = keycloak.initialized && keycloak.keycloak.authenticated

    const [clipboard, setClipboard] = useState<Announcement>()

    return (
        <ResourcesCard
            disableLinks={!authenticated}
            onRefresh={() => reload()}
            isLoading={isLoading}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            resources={data!}
            renderForm={() => <AnnouncementForm
                announcement={clipboard}
                onSubmit={async (sub) => {
                    await create[0](sub);
                    setMode(Mode.NORMAL);
                }}
                onCancel={() => {
                    setMode(Mode.NORMAL);
                }} />}
            renderItem={(item) => <AnnouncementItem onCopy={(announcement) => { setClipboard(announcement); setMode(Mode.EDIT) }} announcement={item}></AnnouncementItem>}
            extractKey={(announcement: Announcement, index) => "announcement_" + index}
            extractPath={(announcement) => "/announcements/" + announcement.uuid}
            {...props}
        />
    )
}



const dateToText = (date: Date): string => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

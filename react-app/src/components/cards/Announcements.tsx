
import {  Typography , IconButton, Link, Tooltip } from "@mui/material";
import { Announcement } from "../../models/types";
import { AnnouncementForm } from "../forms/announcement";
import { useContext, useState } from "react";
import { Mode } from "./Mode";
import { useCreateAnnouncementMutation, useDeleteAnnouncementMutation, useGetAllAnnouncementsQuery } from "../../feature/stakit/announcementSlice";
import { DeleteAnnouncementDialog } from "../dialogs/DeleteDialog";
import { ResourceCard, ResourceCardProps, ResourcesCard, ResourcesCardProps } from "./ResourceCard";
import { t } from "i18next";
import { Action } from "./BaseCard";
import { useKeycloak } from "@react-keycloak/web";
import { Can } from "@casl/react";
import { Operation, Asset } from "../../feature/authentication/config/ability";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import { AnnouncementItem } from "../items/AnnouncementItem";

interface AnnouncementCardProps extends ResourceCardProps<Announcement> { }

export function AnnouncementCard(props: AnnouncementCardProps) {
    const [mode, setMode] = useState(props.mode ?? Mode.NORMAL)
    const remove = useDeleteAnnouncementMutation()[0]
    const { resource: announcement , onUpdate} = props
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
                        props.onUpdate && props.onUpdate(submission);
                        setMode(Mode.NORMAL)
                    }}
                    onCancel={() => setMode(Mode.NORMAL)}
                    announcement={props.resource ?? undefined}
                />
            )}

            onUpdate={(announcement) => {onUpdate && onUpdate(announcement); setMode(Mode.NORMAL)}}

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

interface AnnouncementsCardProps extends Omit<ResourcesCardProps<Announcement>, "resources"> {
    actions?: Action[]
    divider?: JSX.Element
    announcements?: Announcement[]
}

AnnouncementsCard.defaultProps = {
    header: t("Announcements"),
    subHeader: t("A list of the latest announcenements"),
}

export function AnnouncementActions(props: { announcement: Announcement, onCopy?: (announcement: Announcement) => void }) {

    const user = useContext(UserContext)!

    return (
        <>
            <Link onClick={(event) => event.preventDefault()}>
                <Can ability={user?.getAbility()} I={Operation.READ} a={Asset.RESOURCE}>
                    <Tooltip title={<>{t("Copy")}</>}>
                        <IconButton edge="end" onClick={() => props.onCopy && props.onCopy(props.announcement)}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Tooltip>
                </Can>

            </Link>

        </>
    )
}

export function AnnouncementsCard(props: AnnouncementsCardProps) {

    const { isLoading, announcements, onRefresh } = props;
    const create = useCreateAnnouncementMutation()
    const [mode, setMode] = useState<Mode>(Mode.NORMAL)
    const reload = () => { onRefresh && onRefresh() }
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
            resources={announcements!}
            renderForm={() => <AnnouncementForm announcement={clipboard} onSubmit={async (sub) => { await create[0](sub); setMode(Mode.NORMAL); }} onCancel={() => { setMode(Mode.NORMAL); }} />}
            renderItem={(item) => <AnnouncementItem actions={props.showItemActions ? <AnnouncementActions announcement={item} onCopy={(announcement) => { setClipboard(announcement); setMode(Mode.EDIT) }} /> : <> </>} announcement={item} />}
            extractKey={(index) => "announcement_" + index}
            extractPath={(announcement) => "/announcements/" + announcement.uuid}
            {...props}
        />
    )
}


const dateToText = (date: Date): string => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

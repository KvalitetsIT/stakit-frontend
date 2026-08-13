import { Typography, IconButton, Link, Tooltip, Card, CardContent, Stack, Box, Collapse, LinearProgress } from "@mui/material";
import { Announcement } from "../../models/types";
import { AnnouncementForm } from "../forms/announcement";
import { useContext, useState } from "react";
import { Mode } from "./Mode";
import { useCreateAnnouncementMutation, useDeleteAnnouncementMutation, useGetAllAnnouncementsQuery } from "../../feature/stakit/announcementSlice";
import { DeleteAnnouncementDialog } from "../dialogs/DeleteDialog";
import { ResourceCard, ResourceCardProps } from "./ResourceCard";
import { t } from "i18next";
import { Can } from "@casl/react";
import { Operation, Asset } from "../../feature/authentication/config/ability";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import { UserContext } from "../../feature/authentication/logic/FetchUser";
import { AnnouncementItemCard } from "./AnnouncementItemCard";

interface AnnouncementCardProps extends ResourceCardProps<Announcement> { }

export function AnnouncementCard(props: AnnouncementCardProps) {
    const [mode, setMode] = useState(props.mode ?? Mode.NORMAL)
    const remove = useDeleteAnnouncementMutation()[0]
    const { resource: announcement, onUpdate } = props
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

            onUpdate={(announcement) => { onUpdate && onUpdate(announcement); setMode(Mode.NORMAL) }}

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
    announcements?: Announcement[]
    isLoading?: boolean
    onRefresh?: () => void
    showItemActions?: boolean
    disableLinks?: boolean
    divider?: JSX.Element
    actions?: any[]
}

export function AnnouncementActions(props: { announcement: Announcement, onCopy?: (announcement: Announcement) => void }) {

    const user = useContext(UserContext)!

    return (
        <Link onClick={(event) => event.preventDefault()}>
            <Can ability={user?.getAbility()} I={Operation.READ} a={Asset.RESOURCE}>
                <Tooltip title={<>{t("Copy")}</>}>
                    <IconButton edge="end" onClick={() => props.onCopy && props.onCopy(props.announcement)}>
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>
            </Can>
        </Link>
    )
}

export function AnnouncementsCard(props: AnnouncementsCardProps) {

    const { isLoading, announcements, onRefresh, showItemActions } = props;
    const create = useCreateAnnouncementMutation()
    const [mode, setMode] = useState<Mode>(Mode.NORMAL)
    const [clipboard, setClipboard] = useState<Announcement>()

    return (
        <Box>
            <Stack direction="row" justifyContent="flex-end" spacing={0} sx={{ mb: 1 }}>
                <Tooltip title={<>{t("Add")}</>}>
                    <IconButton onClick={() => setMode(mode === Mode.ADD ? Mode.NORMAL : Mode.ADD)}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                {onRefresh && (
                    <Tooltip title={<>{t("Refresh")}</>}>
                        <IconButton onClick={() => onRefresh()}>
                            <ReplayIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>

            {isLoading && <LinearProgress sx={{ mb: 2 }} />}

            <Collapse in={mode === Mode.ADD}>
                <Card sx={{ mb: 2, borderRadius: 1 }}>
                    <CardContent>
                        <AnnouncementForm
                            announcement={clipboard}
                            onSubmit={async (sub) => { await create[0](sub); setClipboard(undefined); setMode(Mode.NORMAL); }}
                            onCancel={() => { setClipboard(undefined); setMode(Mode.NORMAL); }}
                        />
                    </CardContent>
                </Card>
            </Collapse>

            {announcements?.map((announcement, index) => (
                <AnnouncementItemCard
                    key={"announcement_" + index}
                    announcement={announcement}
                    showItemActions={showItemActions}
                    onCopy={(a) => { setClipboard(a); setMode(Mode.ADD) }}
                />
            ))}
        </Box>
    )
}


const dateToText = (date: Date): string => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}
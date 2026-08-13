import { Card, CardContent, Stack, Box, Typography } from "@mui/material";
import { Announcement } from "../../models/types";
import { AnnouncementActions } from "./Announcements";

interface AnnouncementItemCardProps {
    announcement: Announcement
    showItemActions?: boolean
    onCopy?: (announcement: Announcement) => void
}

export function AnnouncementItemCard(props: AnnouncementItemCardProps) {
    const { announcement, showItemActions, onCopy } = props

    return (
        <Card sx={{ mt: 2, borderRadius: 1 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                        <Typography variant="h6" fontWeight="bold">{announcement.subject}</Typography>
                        <Typography variant="h6" color="text.secondary" fontWeight="bold">
                            {new Date(announcement.from_datetime).toLocaleDateString()}
                        </Typography>
                        <Typography color="text.secondary" style={{ whiteSpace: 'pre-line' }}>{announcement.message}</Typography>
                    </Box>
                    {showItemActions && (
                        <AnnouncementActions
                            announcement={announcement}
                            onCopy={onCopy}
                        />
                    )}
                </Stack>
            </CardContent>
        </Card>
    )
}
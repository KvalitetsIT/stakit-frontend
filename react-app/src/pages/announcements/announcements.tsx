import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { AnnouncementCard, AnnouncementsCard } from "../../components/cards/Announcements";
import { useDeleteAnnouncementMutation, useGetAllAnnouncementsQuery, useGetAnnouncementQuery, useUpdateAnnouncementMutation } from "../../feature/stakit/announcementSlice";



export function AnnouncementsPage() {

    const { data, refetch, isLoading } = useGetAllAnnouncementsQuery(undefined);


    return (
        <Container>
            <AnnouncementsCard announcements={data ?? []} isLoading={isLoading} onRefresh={refetch} showItemActions />
        </Container>
    )
}


export function DetailedAnnouncementPage() {

    const params = useParams();

    const id = params.id!

    const { data: announcement, isLoading } = useGetAnnouncementQuery(id)
    const updateAnnouncement = useUpdateAnnouncementMutation()[0];
    const deleteAnnouncement = useDeleteAnnouncementMutation()[0];


    return (
        <Container>
            <AnnouncementCard onUpdate={(announcement) => updateAnnouncement(announcement)} onDelete={deleteAnnouncement} resource={announcement!} isLoading={isLoading} />
        </Container>

    )
}



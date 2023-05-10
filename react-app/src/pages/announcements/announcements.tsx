import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { AnnouncementCard, AnnouncementsCard } from "../../components/cards/Announcements";
import { useGetAllAnnouncementsQuery, useGetAnnouncementQuery } from "../../feature/stakit/announcementSlice";



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

    return (
        <Container>
            <AnnouncementCard resource={announcement!} isLoading={isLoading} />
        </Container>

    )
}



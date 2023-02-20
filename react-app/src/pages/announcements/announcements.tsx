import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { AnnouncementCard, AnnouncementsCard } from "../../components/cards/Announcements";
import { useGetAnnouncementQuery } from "../../feature/stakit/announcementSlice";

export function AnnouncementsPage() {
    return (
        <Container>
            <AnnouncementsCard />
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



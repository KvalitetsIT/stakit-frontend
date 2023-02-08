import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useGetGroupQuery } from "../../feature/stakit/groupsSlice";
import { GroupCard } from "../../components/cards/Groups";

export function GroupDetails() {

    const params = useParams();

    const id = params.id ?? "undefined" 

    const {data: group, isLoading} = useGetGroupQuery(id)


    return (
        <Container sx={{ marginTop: 4 }}>
            <GroupCard resource={group} isLoading={isLoading}/>
        </Container>
    )
}
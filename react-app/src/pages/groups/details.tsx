import { Container } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GroupAccordion } from "../../components/group";
import { Loading } from "../../components/feedback/loading";
import { EditGroup } from "./edit";
import { useGetGroupQuery } from "../../feature/stakit/groupsSlice";

export function GroupDetails() {

    const params = useParams();

    const {data: group, isLoading} = useGetGroupQuery(params.id!)

    const [loading, setLoading] = useState(false)

    const [editMode, setEditMode] = useState(false)

    return (
        <Container sx={{ marginTop: 4 }}>
            <Loading loading={loading}>
                {editMode ?
                    <EditGroup></EditGroup>
                    :
                    <GroupAccordion defaultExpanded group={group!} />
                }
            </Loading>
        </Container>
    )
}
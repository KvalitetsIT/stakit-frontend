import { Container } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GroupAccordion } from "../../components/group";
import { Loading } from "../../components/feedback/loading";
import { mock } from "../../MockedData";
import { Group } from "../../models/types";
import { EditGroup } from "./edit";

export function GroupDetails() {

    const params = useParams();

    const group: Group | undefined = mock.groups.find(group => group.id === params.id)

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
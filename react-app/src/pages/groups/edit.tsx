import { Card, CardContent, CardHeader } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { EditGroupForm } from "../../components/forms/group";
import { useGetAllGroupsQuery, useGetGroupQuery, useUpdateGroupMutation } from "../../feature/api/groupsSlice";
import { mock } from "../../MockedData";
import { Group } from "../../models/types";

export function EditGroup() {

    const id = useParams().id;

    const {data} = useGetGroupQuery(id!) // <-- might be undefined or wrong 
    const group: Group | undefined =  data


    const updateGroup = useUpdateGroupMutation()[0]

    return (

        <Container sx={{ paddingTop: 2 }}>
            <Card>
                <CardHeader title={group?.name} />
                <CardContent>
                    <EditGroupForm
                        group={group}
                        onSubmit={(group) => {
                            updateGroup(group)
                        }}
                        onCancel={() => { window.history.go(-1) }}
                    />
                </CardContent>
            </Card>
        </Container>

    )
}
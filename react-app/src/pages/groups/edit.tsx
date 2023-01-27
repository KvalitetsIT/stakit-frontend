import { Card, CardContent, CardHeader } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { GroupForm } from "../../components/forms/group";
import { useGetGroupQuery, useUpdateGroupMutation } from "../../feature/stakit/groupsSlice";
import { Group } from "../../models/group";


export function EditGroup() {

    const id = useParams().id;

    const {data, isError} = useGetGroupQuery(id!) // <-- might be undefined or wrong 

    // if(idIsMissing || idNotExisting) go back.. or redirect to "/groups"

    const group: Group | undefined =  data


    const updateGroup = useUpdateGroupMutation()[0]

    return (

        <Container sx={{ paddingTop: 2 }}>
            <Card>
                <CardHeader title={group?.name} />
                <CardContent>
                    <GroupForm
                        group={group}
                        onSubmit={async (group) => {
                            updateGroup(group)
                        }}
                        onCancel={() => { window.history.go(-1) }}
                    />
                </CardContent>
            </Card>
        </Container>

    )
}
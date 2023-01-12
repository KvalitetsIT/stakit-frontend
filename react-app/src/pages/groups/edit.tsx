import { Card, CardContent, CardHeader } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { EditGroupForm } from "../../components/forms/group";
import { mock } from "../../MockedData";
import { Group } from "../../models/types";

export function EditGroup() {

    const params = useParams();
    const group: Group | undefined = mock.groups.find(group => group.uuid === params.id )

    return (

        <Container sx={{ paddingTop: 2 }}>
            <Card>
                <CardHeader title={group?.name} />
                <CardContent>
                    <EditGroupForm
                        group={group}
                        onSubmit={(group) => {
                            console.log("group", group)
                        }}
                        onCancel={() => { window.history.go(-1) }}
                    />
                </CardContent>
            </Card>
        </Container>

    )
}
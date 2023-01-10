import { Card, CardContent, CardHeader, Container } from "@mui/material";

import { useParams } from "react-router-dom";
import { ServiceForm } from "../../components/forms/service";
import { mock } from "../../MockedData";
import { Service } from "../../models/types";

export function EditService() {


    const params = useParams();

    const service: Service | undefined = mock.groups.flatMap(group => group.services).find(service => service!.id === params.id!)

    return (


        <Container>

            <Card>

                <CardHeader
                    title={service?.name}

                >

                </CardHeader>
                <CardContent>
                    <ServiceForm
                        service={service!}
                        onSubmit={async (service) => { console.log("Submitted", service); }}
                        onCancel={() => { window.history.go(-1); }}
                        optionalGroups={mock.groups} />

                </CardContent>
            </Card>

        </Container>


    )
}
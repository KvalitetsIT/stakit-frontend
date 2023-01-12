import { Card, CardContent, CardHeader, Container } from "@mui/material";

import { useParams } from "react-router-dom";
import { Loading } from "../../components/feedback/loading";
import { ServiceForm } from "../../components/forms/service";
import { useGetServiceQuery } from "../../feature/api/serviceSlice";
import { mock } from "../../MockedData";
import { Service } from "../../models/types";

export function EditService() {


    const id = useParams().id;

    const { isLoading, data } = useGetServiceQuery(id!)

    const service = data
    return (
        <Container>
            <Loading loading={isLoading}>
                <Card>
                    <CardHeader title={service?.name}>
                    </CardHeader>
                    <CardContent>
                        <ServiceForm
                            service={service!}
                            onSubmit={async (service) => { console.log("Submitted", service); }}
                            onCancel={() => { window.history.go(-1); }}
                            optionalGroups={mock.groups} />

                    </CardContent>
                </Card>
            </Loading>
        </Container>


    )
}
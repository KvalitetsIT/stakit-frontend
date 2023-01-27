import { Card, CardContent, CardHeader, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/feedback/loading";
import { ServiceForm } from "../../components/forms/service";
import { useGetServiceQuery } from "../../feature/stakit/serviceSlice";

export function EditService() {


    const id = useParams().id;

    const { isLoading, data: service  } = useGetServiceQuery(id!)

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
                        />
                    </CardContent>
                </Card>
            </Loading>
        </Container>


    )
}
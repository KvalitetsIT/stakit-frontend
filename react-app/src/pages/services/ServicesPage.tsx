import { Container } from "@mui/material";
import { ServicesCard } from "../../components/cards/Services";
import { useGetAllServicesQuery } from "../../feature/stakit/serviceSlice";

export function ServicesPage() {

    const { isLoading, data, refetch } = useGetAllServicesQuery(undefined)

    return (
        <Container>
            <ServicesCard isLoading={isLoading} services={data ?? []} onRefresh={refetch} />
        </Container>

    )
}

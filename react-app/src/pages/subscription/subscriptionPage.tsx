import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetServiceQuery } from "../../feature/stakit/serviceSlice";
import { ServiceCard } from "../../components/cards/Services";


export function SubscriptionPage() {

    const params = useParams();

    const { isLoading, data: service } = useGetServiceQuery(params.id!)
    
    return (
        <>
            <Container sx={{ paddingTop: 4 }}>
                <ServiceCard resource={service} isLoading={isLoading} />
                
            </Container >
        </>
    )
}






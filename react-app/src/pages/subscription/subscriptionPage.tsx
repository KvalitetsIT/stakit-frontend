import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetServiceQuery } from "../../feature/stakit/serviceSlice";
import { ServiceCard } from "../../components/cards/Services";
import { SubscriptionCard } from "../../components/cards/Subscription";
import { useGetSubscriptionQuery } from "../../feature/stakit/subscriptionSlice";


export function SubscriptionPage() {

    const params = useParams();

    const { isLoading, data: subscription } = useGetSubscriptionQuery(params.id!)
    
    return (
        <>
            <Container sx={{ paddingTop: 4 }}>
                <SubscriptionCard resource={subscription} isLoading={isLoading} />
            </Container >
        </>
    )
}






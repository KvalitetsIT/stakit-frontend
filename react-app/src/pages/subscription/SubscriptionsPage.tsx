import { Container } from "@mui/material";
import { ServicesCard } from "../../components/cards/Services";
import { SubscriptionsCard } from "../../components/cards/Subscription";
import { SubscriptionAccordion } from "../../components/accordion/subscription";
import { Subscription } from "../../models/types";
import { useGetAllSubscriptionsQuery } from "../../feature/stakit/subscriptionSlice";

export function SubscriptionsPage() {

    const { isLoading, data: subscriptions, refetch } = useGetAllSubscriptionsQuery(undefined)


    //const { isLoading: isLoadingServices, data: services } = useGetAllServicesQuery(undefined)

    //if (isLoadingServices || isLoading) return <></>


    return (
        <Container>
            <SubscriptionsCard isLoading={isLoading} onRefresh={() => refetch()} />
            {
                subscriptions && subscriptions.map((subscription: Subscription) => <SubscriptionAccordion subscription={subscription}></SubscriptionAccordion>)
            }

        </Container>

    )
}

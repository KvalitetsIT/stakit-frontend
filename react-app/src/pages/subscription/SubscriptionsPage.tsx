import { Container } from "@mui/material";
import { ServicesCard } from "../../components/cards/Services";
import { SubscriptionsCard } from "../../components/cards/Subscription";
import { SubscriptionAccordion } from "../../components/accordion/subscription";
import { Subscription } from "../../models/types";
import { useGetAllSubscriptionsQuery } from "../../feature/stakit/subscriptionSlice";
import { useGetAllGroupsQuery } from "../../feature/stakit/groupsSlice";
import { Mapper } from "../groups/all";

export function SubscriptionsPage() {

    const { isLoading: isLoadingSubscriptions, data, refetch } = useGetAllSubscriptionsQuery(undefined)


    //const { isLoading: isLoadingServices, data: services } = useGetAllServicesQuery(undefined)

    //if (isLoadingServices || isLoading) return <></>

    const { isLoading: isLoadingGroups, data: groups } = useGetAllGroupsQuery(undefined)

    const isLoading = isLoadingSubscriptions || isLoadingGroups;

    if (isLoading) return <></>

    const subscriptions = data && data.map(subscription => Mapper.subscriptionToModel(subscription, groups))

    return (
        <Container>
            <SubscriptionsCard isLoading={isLoading} onRefresh={() => refetch()} />
            {
                subscriptions && subscriptions.map((subscription: Subscription) => <SubscriptionAccordion subscription={subscription}></SubscriptionAccordion>)
            }
        </Container>

    )
}

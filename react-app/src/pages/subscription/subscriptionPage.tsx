import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { SubscriptionCard } from "../../components/cards/Subscription";
import { useGetSubscriptionQuery } from "../../feature/stakit/subscriptionSlice";
import { useGetAllGroupsQuery } from "../../feature/stakit/groupsSlice";
import { Subscription } from "../../models/types";


export function SubscriptionPage() {

    const params = useParams();
    const { isLoading, data: subscriptionDTO } = useGetSubscriptionQuery(params.id!)
    const {isLoading: groupsIsLoading, data: groups } = useGetAllGroupsQuery(undefined)
    let subscription: Subscription = structuredClone(subscriptionDTO)

    if(!groupsIsLoading && subscriptionDTO && groups ) subscription.groups = groups.filter(group => (subscriptionDTO?.groups as string[]).includes(group.uuid!))

    return (
        <>
            <Container sx={{ paddingTop: 4 }}>
                <SubscriptionCard resource={subscription} isLoading={isLoading} />
            </Container >
        </>
    )
}






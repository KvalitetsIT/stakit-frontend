import { Container } from "@mui/material";
import { ServicesCard } from "../../components/cards/Services";
import { SubscriptionsCard } from "../../components/cards/Subscription";
import { SubscriptionAccordion } from "../../components/accordion/subscription";
import { Subscription } from "../../models/types";
import { useGetAllSubscriptionsQuery } from "../../feature/stakit/subscriptionSlice";

export function SubscriptionsPage() {

    const { isLoading, data, refetch } = useGetAllSubscriptionsQuery(undefined)


    const subscriptions: Subscription[] = [
        {
            email: "alice@gmail.com",
            groups: [
                {
                    name: "GroupName1",
                    description: "GroupDescription1",
                    services: [],
                    display_order: 1,
                    show: true
                },
                {
                    name: "GroupName2",
                    description: "GroupDescription2",
                    services: [],
                    display_order: 1,
                    show: true
                }
            ],
            uuid: "some uuid",
            announcements: true
            
        },
        {

            email: "bob@gmail.com",
            groups: [
                {
                    name: "GroupName1",
                    description: "GroupDescription1",
                    services: [],
                    display_order: 1,
                    show: true
                },
                {
                    name: "GroupName2",
                    description: "GroupDescription2",
                    services: [],
                    display_order: 1,
                    show: true
                }
            ],
            uuid: "some uuid",
            announcements: true
        }
    ]

    //const { isLoading: isLoadingServices, data: services } = useGetAllServicesQuery(undefined)

    //if (isLoadingServices || isLoading) return <></>


    return (
        <Container>
            <SubscriptionsCard isLoading={false} onRefresh={() => refetch()} />
            {
                subscriptions && subscriptions.map((subscription: Subscription) => <SubscriptionAccordion subscription={subscription}></SubscriptionAccordion>)
            }

        </Container>

    )
}

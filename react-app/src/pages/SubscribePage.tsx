import { Container, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { SubscriptionForm } from "../components/forms/subscribe";
import { CenteredContent } from "../components/layout/CenteredContent";
import { useGetAllGroupsQuery } from "../feature/stakit/groupsSlice";
import { useCreateSubscriptionMutation, useGetStatusOfGroupsQuery } from "../feature/stakit/publicSlice";
import { Subscription } from "../models/types";
import { Mode } from "../components/cards/Mode";

export function SubscribePage() {

    const request = useCreateSubscriptionMutation()[0]

    const [mode, setMode] = useState<Mode>(Mode.NORMAL)

    const onSubscribtion = (subscription: Subscription) => {
        request(subscription)
    }

    const { isLoading: isStatusOfGroupsQueryLoading, data: groups } = useGetStatusOfGroupsQuery(undefined) ?? []

    switch (mode) {
        case Mode.SUCCESS: return (
            <CenteredContent>
                <Container maxWidth="sm">
                    <Typography variant="h3" textAlign={"center"}>Success</Typography>
                    <Typography variant="h6">Check your email. You should recieve a confirmation</Typography>
                </Container>
            </CenteredContent>
        )
        default: return (
            <CenteredContent>
                <Container maxWidth="sm">
                    <Typography variant="h3" textAlign={"center"}>Subscribe</Typography>
                    <Typography variant="h6" marginBottom={2}>Fill out the form below in order to get notified</Typography>
                    <SubscriptionForm
                        optionalGroups={groups}
                        onSubmit={async (subscription) => onSubscribtion(subscription)}
                        onCancel={() => window.history.go(-1)}
                    ></SubscriptionForm>
                </Container>
            </CenteredContent>
        )
    }



}


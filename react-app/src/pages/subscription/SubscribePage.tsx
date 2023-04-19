import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { SubscriptionForm } from "../../components/forms/subscribe";
import { CenteredContent } from "../../components/layout/CenteredContent";
import { useCreateSubscriptionMutation, useGetStatusOfGroupsQuery } from "../../feature/stakit/publicSlice";
import { Subscription } from "../../models/types";
import { Mode } from "../../components/cards/Mode";
import { t } from "i18next";
import { Loading } from "../../components/feedback/loading";

export function SubscribePage() {

    const [mode, setMode] = useState<Mode>(Mode.NORMAL)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const request = useCreateSubscriptionMutation()[0]


    const onSubscribtion = (subscription: Subscription) => {
        setIsLoading(true)
        request(subscription).then(() => {
            setMode(Mode.SUCCESS);
        }).catch((error) => {
            console.error("error", error)
        })
        setIsLoading(false)
    }

    const { isLoading: isStatusOfGroupsQueryLoading, data: groups } = useGetStatusOfGroupsQuery(undefined) ?? []

    switch (mode) {
        case Mode.SUCCESS: return (
            <CenteredContent>
                <Container maxWidth="sm">
                    <Typography variant="h3" textAlign={"center"}>{t("Success") + ""}</Typography>
                    <Typography variant="h6">{t("Check your email. You should recieve a confirmation") + ""}</Typography>
                </Container>
            </CenteredContent>
        )
        default: return (
            <CenteredContent>
                <Loading loading={isLoading}>
                    <Container maxWidth="sm">
                        <Typography variant="h3" textAlign={"center"}>{t("Subscribe") + ""}</Typography>
                        <Typography variant="h6" textAlign={"center"} marginBottom={2}>{t("Fill out the form below in order to get notified") + ""}</Typography>
                        <Typography marginBottom={2} textAlign={"center"} >{t("A previous subscription is overwritten when a new one is created") + ""}</Typography>
                        <SubscriptionForm
                            optionalGroups={groups}
                            onSubmit={async (subscription) => onSubscribtion(subscription)}
                            onCancel={() => window.history.go(-1)}
                        ></SubscriptionForm>
                    </Container>
                </Loading>
            </CenteredContent>
        )
    }
}






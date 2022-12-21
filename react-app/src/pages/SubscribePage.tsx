import { Container, Typography } from "@mui/material";
import { wait } from "@testing-library/user-event/dist/utils";
import { t } from "i18next";
import { toast } from "react-toastify";
import { SubscriptionForm } from "../components/forms/subscribe";
import { CenteredContent } from "../components/layout/CenteredContent";
import { mock } from "../MockedData";
import { Group, Subscription } from "../models/types";

export function SubscribePage() {

    const onSubscribtion = (subscription: Subscription) => {

        toast.promise(
            async () => {
                await wait(1000) // Do something
            },
            {
                pending: t('processing subscription'),
                success: subscription.email + t(" successfully subscribed"),
                error: t('subscription rejected')
            }
        )
    }



    const groups: Group[] = mock.groups


    return (
        <>
            <CenteredContent>
                <Container maxWidth="sm">
                    <Typography variant="h3" textAlign={"center"}>Subscribe</Typography>
                    <Typography variant="h6">Fill out the form below in order to get notified</Typography>


                    <SubscriptionForm
                        optionalGroups={groups}
                        onSubmit={async (subscription) => onSubscribtion(subscription)}
                        onCancel={() => window.history.go(-1)}
                    ></SubscriptionForm>
                </Container>



            </CenteredContent>
        </>
    )

}


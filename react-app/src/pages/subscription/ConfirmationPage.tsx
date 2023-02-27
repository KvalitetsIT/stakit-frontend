import { Typography } from "@mui/material";
import { t } from "i18next";
import { redirect, useParams } from "react-router-dom";
import { Loading } from "../../components/feedback/loading";
import { CenteredContent } from "../../components/layout/CenteredContent";
import { useConfirmSubscriptionQuery } from "../../feature/stakit/publicSlice";

export function ConfirmSubscriptionPage() {


    const params = useParams();

    const id = params.id!

    const { data, isLoading, isError, isSuccess } = useConfirmSubscriptionQuery(id)

    return (
        <>
            <CenteredContent>
                <Loading loading={isLoading}>
                    {isSuccess && (
                        <>
                            <Typography variant="h2">{t("Success")+"!"}</Typography>
                            <Typography>{t("Your subscription has been confirmed")+""}</Typography>
                        </>
                    )}
                    {isError && (
                        <>
                            <Typography variant="h2">{t("Error")+"..."}</Typography>
                            <Typography>{t("Your subscription could unfortunately not be confirmed")+""}</Typography>
                        </>
                    )}
                </Loading>
            </CenteredContent>
        </>
    )
}
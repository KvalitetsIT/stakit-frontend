import { Typography } from "@mui/material";
import { t } from "i18next";
import { redirect, useParams } from "react-router-dom";
import { Loading } from "../../components/feedback/loading";
import { CenteredContent } from "../../components/layout/CenteredContent";
import { useUnsubscribeQuery } from "../../feature/stakit/publicSlice";

export function UnsubscribePage() {
    const params = useParams();

    const id = params.id!

    const { data, isLoading, isError, isSuccess } = useUnsubscribeQuery(id)

    return (
        <>
            <CenteredContent>
                <Loading loading={isLoading}>
                    {isSuccess && (
                        <>
                            <Typography variant="h2">{t("Success")+"!"}</Typography>
                            <Typography>{t("You have been unubscribed")+""}</Typography>
                        </>
                    )}
                    {isError && (
                        <>
                            <Typography variant="h2">{t("Error")+"..."}</Typography>
                            <Typography>{t("Your unsubscribe request could unfortunately not be handled")+""}</Typography>
                        </>
                    )}
                </Loading>
            </CenteredContent>
        </>
    )
}
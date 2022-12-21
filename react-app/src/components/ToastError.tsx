import { CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ApiError } from "../models/API/Error";
import {
    getReasonPhrase
} from 'http-status-codes';

interface ToastErrorProps {
    error: ApiError
    toastErrorText?: string
}
export default function ToastError(props: ToastErrorProps) {
    const { t, i18n } = useTranslation()

    const error = props.error;
    const statusText = error.status ? getReasonPhrase(error.status) : "No status";
    return (
        <Stack>
            <Typography variant="body2">
                {props.toastErrorText ? t(props.toastErrorText) + "" : t("Error")}
            </Typography>
            <Typography variant="caption">{error.status + " : " + t(statusText)}</Typography>
            <Typography variant="caption">{t(error.error ?? "")}</Typography>
        </Stack>)
}
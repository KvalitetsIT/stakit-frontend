import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ToastError from "../components/ToastError";
import { ApiError } from "../models/API/Error";
export class ResponsePackage {
    response!: Response
    toastSuccessText?: string
    toastErrorText?: string
    toastWithResult?: boolean
}

export default async function handleResponse(
    pack: ResponsePackage
) {

    let json: any = undefined
    try {
        json = await pack.response.json()
    } catch (e) { }

    let error = json as ApiError;

    const bodyIsApiError = ApiError.IsApiError(error)
    if (!bodyIsApiError)
        error = {
            status: pack.response.status,
            path: pack.response.url,
            error: json
        }

    const shouldShowToast = pack.toastWithResult ?? true

    const isSuccess = pack.response.status > 199 && pack.response.status < 300;
    if (isSuccess && shouldShowToast) {
        toast.success(pack.toastSuccessText ? t(pack.toastSuccessText) + "" : t("Your change has been saved") + "")
    }

    if (!isSuccess) {
        toast.error(<ToastError toastErrorText={pack.toastErrorText} error={error} />)
    }

    return json;
}
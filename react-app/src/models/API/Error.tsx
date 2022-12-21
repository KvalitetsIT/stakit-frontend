

export class ApiError {
    error?: string
    path?: string
    status?: number
    timestamp?: Date

    static IsApiError(obj: any): boolean {
        if (obj == undefined)
            return false

        let isApiError = true;
        isApiError &&= obj.error !== undefined
        isApiError &&= obj.path !== undefined
        isApiError &&= obj.status !== undefined
        isApiError &&= obj.timestamp !== undefined

        return isApiError;
    }
}
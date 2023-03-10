import { CircularProgress } from "@mui/material"
import { ReactNode } from "react"
import { CenteredContent } from "../layout/CenteredContent"

export function Loading(props: { loading?: boolean, children?: ReactNode, placeholder: ReactNode }) {

    return (
        <>
            {props.loading ? props.placeholder : props.children}
        </>
    )
}


Loading.defaultProps = {
    placeholder: <CircularProgress />,
    loading: true
}

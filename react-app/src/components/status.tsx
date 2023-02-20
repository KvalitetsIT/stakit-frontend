import { Status } from "../models/types"
import { Avatar, Icon, useTheme } from "@mui/material";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
StatusIcon.defaultProps = {
    variant: "default"
}

export function StatusIcon(props: { status?: Status, colored?: boolean, variant: "default" | "outlined" }) {

    const { colored, variant } = props
    const color = useGetColorTagByStatus(props.status)
    const nonColor = "white"

    switch (props.status) {
        case Status.OK: {
            if (variant === "outlined") return <CheckCircleIcon sx={{color: colored ? color : nonColor}} />
            return <DoneIcon sx={{color: colored ? color : nonColor}} />
        }
        case Status.NOT_OK: {
            if (variant === "outlined") return <CancelIcon sx={{color: colored ? color : nonColor}} />
            return <CloseIcon sx={{color: colored ? color : nonColor}} />
        }
        default: {
            if (variant === "outlined") return <HelpIcon sx={{color: colored ? color : nonColor}} />
            return <QuestionMarkIcon sx={{color: colored ? color : nonColor}} />
        }
    }

}


export function StatusAvatar(props: { status?: Status }) {

    const color = useGetColorByStatus(props.status)

    return (
        <Avatar sx={{ backgroundColor: color }}>
            <StatusIcon {...props} />
        </Avatar>
    )
}

export function useGetColorByStatus(status?: Status) {
    const theme = useTheme()
    const success = theme.palette.success.main
    const error = theme.palette.error.main
    const info = theme.palette.info.main

    const color = status ? (status === Status.OK ? success : error) : info

    return color
}

export function useGetColorTagByStatus(status?: Status): "error" | "info" | "success" {
    switch (status) {
        case Status.OK: return "success"
        case Status.NOT_OK: return "error"
        default: return "info"
    }
}


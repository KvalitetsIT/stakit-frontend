import { IconButton, Tooltip } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

export const Action = (props: {icon: ReactNode, onClick?: MouseEventHandler<HTMLButtonElement> | undefined, title: string}) => (
        <Tooltip title={props.title}>
            <IconButton onClick={props.onClick}>
                {props.icon}
            </IconButton>
        </Tooltip>
    
)
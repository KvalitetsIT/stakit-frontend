import { Replay } from "@mui/icons-material"
import { CardProps, Card, CardActionArea, LinearProgress, CardHeader, IconButton, Collapse, CardContent, Divider, Tooltip, Typography } from "@mui/material"
import { ReactElement, ReactNode, useContext } from "react"
import { Operation } from "../../feature/authentication/config/ability"
import { Can } from "../../feature/authentication/logic/Can"
import { UserContext } from "../../feature/authentication/logic/FetchUser"
import { StatusAvatar } from "../status"
import { Mode } from "./Mode"

// TODO: Actions should be a component 
export interface Action { title: string, icon: ReactNode, secondaryIcon?: ReactNode, mode: Mode }

export interface BaseCardProps<T> {
    mode?: Mode
    isLoading?: boolean
    actions?: Action[]
    resource?: T | T[]
    subHeader?: ReactNode
    renderForm?: (resource?: T) => ReactNode
    onModeChange?: (mode: Mode) => void
    onRefresh?: () => void
    renderContent?: JSX.Element
    padding?: number
    avatar?: JSX.Element | ReactNode
    header?: string
}


export function BaseCard<T>(props: BaseCardProps<T>) {

    const { padding, renderContent, actions, header, subHeader, isLoading, mode, onModeChange, renderForm, resource } = props
    const isList = Array.isArray(resource)

    const user = useContext(UserContext)!

    return (
        <Card>
            <CardActionArea>
                <LinearProgress color="secondary" variant={isLoading ? "indeterminate" : "determinate"} value={isLoading ? 0 : 100} />
            </CardActionArea>
            <CardHeader
                {...props}
                title={<Typography variant="h5">{header}</Typography>}
                subheader={subHeader}
                action={
                    <>
                        <Can ability={user.getAbility()} I={Operation.MANAGE} a={"resource"}>
                            {actions && actions.map(action => (
                                <Tooltip title={action.title}>
                                    <IconButton
                                        disabled={mode !== Mode.NORMAL}
                                        aria-label={action.title}
                                        onClick={() => mode === Mode.NORMAL ? onModeChange && onModeChange(action.mode) : onModeChange && onModeChange(Mode.NORMAL)}
                                    >
                                        {mode === action.mode ? action.secondaryIcon ?? action.icon : action.icon}
                                    </IconButton>
                                </Tooltip>

                            ))}

                        </Can>
                        {
                            props.onRefresh && (

                                <Tooltip title={"Refresh"}>
                                    <IconButton
                                        disabled={mode !== Mode.NORMAL}
                                        aria-label={"Refresh"}
                                        onClick={() => props.onRefresh && props.onRefresh()}
                                    >
                                        <Replay></Replay>
                                    </IconButton>
                                </Tooltip>
                            )
                        }

                    </>
                }
            />
            < Collapse in={mode === Mode.ADD || mode === Mode.EDIT}>
                <CardContent>
                    {renderForm && renderForm(isList ? undefined : resource)}
                </CardContent>
                <Divider />
            </Collapse >
            <CardContent sx={{ padding: padding }}>
                {renderContent}
            </CardContent>
        </Card >
    )
}
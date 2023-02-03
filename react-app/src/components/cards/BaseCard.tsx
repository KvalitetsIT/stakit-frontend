import { CardProps, Card, CardActionArea, LinearProgress, CardHeader, IconButton, Collapse, CardContent, Divider, Tooltip } from "@mui/material"
import { ReactNode } from "react"
import { Mode } from "./Mode"

// TODO: Actions should be a component 
export interface Action { title: string, icon: ReactNode, secondaryIcon?: ReactNode, mode: Mode }

export interface BaseCardProps<T> extends Omit<CardProps, "resource"> {
    mode?: Mode
    isLoading?: boolean
    actions?: Action[]
    resource: T | T[]
    header?: ReactNode
    subHeader?: ReactNode
    renderForm?: (resource?: T) => ReactNode
    onModeChange?: (mode: Mode) => void
    onRefresh?: () => void
    renderContent?: ReactNode
    padding?: number
}

export function BaseCard<T>(props: BaseCardProps<T>) {

    const { padding, renderContent, actions, header, subHeader, isLoading, mode, onModeChange, renderForm, resource } = props

    const isList = Array.isArray(resource)

    return (
        <Card>
            <CardActionArea>
                <LinearProgress color="secondary" variant={isLoading ? "indeterminate" : "determinate"} />
            </CardActionArea>
            <CardHeader
                title={header}
                subheader={subHeader}
                action={<>
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
                </>
                }
            />
            <Collapse in={mode === Mode.ADD || mode === Mode.EDIT}>
                <CardContent>
                    {renderForm && renderForm(isList ? undefined : resource)}
                </CardContent>
                <Divider />
            </Collapse>
            <CardContent sx={{ padding: padding }}>
                {renderContent}
            </CardContent>
        </Card>
    )
}
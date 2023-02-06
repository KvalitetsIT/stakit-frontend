import { Add, Delete, Refresh } from "@mui/icons-material"
import { List } from "@mui/material"
import { ReactElement, ReactNode } from "react"
import { Mode as Mode } from "./Mode";
import EditIcon from '@mui/icons-material/Edit';
import { DeleteItemDialog } from "../dialogs/DeleteDialog"
import { Link } from "react-router-dom"
import { Action, BaseCard, BaseCardProps } from "./BaseCard"


export interface ResourceCardProps<T> extends BaseCardProps<T> {
    resource?: T
    onDelete?: (resource: T) => void
    onUpdate?: (resource: T) => void

    deleteDialog?: ReactElement<typeof DeleteItemDialog>

}

export function ResourceCard(props: ResourceCardProps<any>) {
    const actions: Action[] = [
        { title: "Edit", icon: <EditIcon />, mode: Mode.EDIT },
        { title: "Delete", icon: <Delete />, mode: Mode.DELETE },
        { title: "Refresh", icon: <Refresh />, mode: Mode.NORMAL }
    ]
    const { mode, onModeChange, resource } = props

    return (

        <>
            <BaseCard actions={actions} {...props} />

            {props.deleteDialog ?? <DeleteItemDialog
                item={props.resource}
                open={mode === Mode.DELETE}
                onClose={function (): void {
                    onModeChange && onModeChange(Mode.NORMAL)
                }}

                onSuccess={function (item: any): void {
                    props.onDelete && props.onDelete(item)
                }}
            />}
        </>
    )
}

export interface ResourcesCardProps<T> extends Omit<BaseCardProps<T>, "resource"> {
    resources: T[]
    onAdd?: (resource: T) => void
    renderItem: (resource: T) => ReactNode
    extractKey: (resource: T, index: number) => string
    extractPath?: (resource: T) => string
}
 

export function ResourcesCard<T extends any>(props: ResourcesCardProps<T>) {

    const actions: Action[] = [
        { title: "Add", icon: <Add />, mode: Mode.ADD },
        { title: "Refresh", icon: <Refresh />, mode: Mode.NORMAL }
    ]
    const { renderItem, resources, extractPath, extractKey } = props
    return (
        <BaseCard
            resource={resources}
            actions={actions}
            padding={0}
            renderContent={
                <List>
                    {resources?.map((resource, index: number) => extractPath ?
                        <Link
                            style={{ color: 'inherit', textDecoration: 'inherit' }}
                            key={extractKey(resource, index)}
                            to={extractPath(resource)}
                        >
                            {renderItem(resource)}
                        </Link>
                        : renderItem(resource))}
                </List>
            }

            {...props}
        />)
}


import { Add, Delete } from "@mui/icons-material"
import { List } from "@mui/material"
import { ReactElement } from "react"
import { Mode } from "./Mode";
import EditIcon from '@mui/icons-material/Edit';
import { DeleteItemDialog } from "../dialogs/DeleteDialog"
import { Action, BaseCard, BaseCardProps } from "./BaseCard"
import { t } from "i18next";
import { ItemWithLink } from "../service";


export interface ResourceCardProps<T> extends BaseCardProps<T> {
    resource?: T
    onDelete?: (resource: T) => void
    onUpdate?: (resource: T) => void
    deleteDialog?: ReactElement<typeof DeleteItemDialog>
    
}

export function ResourceCard(props: ResourceCardProps<any>) {
    const actions: Action[] = [
        { title: t("Edit"), icon: <EditIcon />, mode: Mode.EDIT },
        { title: t("Delete"), icon: <Delete />, mode: Mode.DELETE },
    ]
    const { mode, onModeChange, resource } = props

    return (

        <>
            <BaseCard actions={actions} {...props} />

            {props.deleteDialog ?? <DeleteItemDialog
                item={resource}
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
    renderItem?: (resource: T) => JSX.Element
    extractKey?: (resource: T, index: number) => string
    extractPath?: (resource: T) => string
    actions?: Action[]
    disableLinks?: boolean
}

ResourcesCard.defaultProps= {
    actions: [
        { title: t("Add"), icon: <Add />, mode: Mode.ADD },
    ]
}

export function ResourcesCard<T extends any>(props: ResourcesCardProps<T>) {

    
    const { actions, renderItem, resources, extractPath, extractKey, disableLinks} = props

    return (
        <BaseCard
            resource={resources}
            actions={actions}
            padding={0}
            renderContent={
                <List>
                    {renderItem && resources?.map((resource, index: number) => extractPath ?
                        <ItemWithLink
                            disabled={disableLinks}
                            key={extractKey && extractKey(resource, index)}
                            to={extractPath(resource)}
                        >
                            {renderItem(resource)}
                        </ItemWithLink>
                        : renderItem(resource))}
                </List>
            }

            {...props}
        />)
}


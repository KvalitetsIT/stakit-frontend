import { Add, Delete } from "@mui/icons-material"
import { List } from "@mui/material"
import { ReactElement } from "react"
import { Mode } from "./Mode";
import EditIcon from '@mui/icons-material/Edit';
import { DeleteItemDialog } from "../dialogs/DeleteDialog"
import { Action, BaseCard, BaseCardProps } from "./BaseCard"
import { t } from "i18next";
import { ItemWithLink } from "../items/ItemWithLink";


export interface ResourceCardProps<T> extends BaseCardProps<T> {
    /**
     * The resource which is shown by the card
     */
    resource?: T

    /**
     * The callback which is to be triggered on delete
     * @param resource The resource which requested to be deleted  
     * @returns 
     */
    onDelete?: (resource: T) => void

    /**
     * The callback which is to be triggered when the resource is updated
     * @param resource The resource which is requested to be updated  
     * @returns 
     */
    onUpdate?: (resource: T) => void


    /**
     * A dialog which is shown if a "delete" is requested. 
     * eg. are you sure you want to delete the resource
     */
    deleteDialog?: ReactElement<typeof DeleteItemDialog>

    
    /**
    * The list of actions that apears in the top right corner of the card
    */
    actions?: Action[]
}

ResourceCard.defaultProps = {
    actions: [
        { title: t("Edit"), icon: <EditIcon />, mode: Mode.EDIT },
        { title: t("Delete"), icon: <Delete />, mode: Mode.DELETE },
    ]
}


export function ResourceCard(props: ResourceCardProps<any>) {
    const { actions,  mode, onModeChange, resource } = props

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

    /**
     * The callback that is triggered when a new resources is added
     * @param resource The new resource which is just added
     * @returns 
     */
    onAdd?: (resource: T) => void

    /**
     * Determines how every resource in the list is being rendered
     * @param resource 
     * @returns 
     */
    renderItem?: (resource: T) => JSX.Element
    /**
     * For convienience this can be used to extract the key for every given item/resource in the list of resources
     * @param resource The given resource
     * @param index The corresponding index 
     * @returns A key of type string 
     */
    extractKey?: (resource: T, index: number) => string

    /**
     * If links are not disabled this will be used to extract the path to the given resources. In other words, the link to the details page 
     * @param resource The resource which is given for convienice if the path is extracted from this eg. "/resources/{resource.uuid}"
     * @returns 
     */
    extractPath?: (resource: T) => string
    actions?: Action[]

    /**
     * Determines if every item should be clickable and navigate the user to the path specified by "extractPath"
     */
    disableLinks?: boolean

    /**
     * An element which is rendered in between every item of the list
     */
    divider?: JSX.Element

    /**
     * Determines if the actions of every item is supposed to be shown or not 
     */
    showItemActions?: boolean
}

ResourcesCard.defaultProps = {
    actions: [
        { title: t("Add"), icon: <Add />, mode: Mode.ADD },
    ]
}

export function ResourcesCard<T extends any>(props: ResourcesCardProps<T>) {


    const { actions, renderItem, resources, extractPath, extractKey, disableLinks } = props

    return (
        <BaseCard
            resource={resources}
            actions={actions}
            padding={0}
            renderContent={renderItem &&
                (
                    <List>
                        {resources?.map((resource, index: number) => (
                            <>
                                {index > 0 && props.divider}
                                <ItemWithLink disabled={disableLinks} to={(extractPath && extractPath(resource)) ?? ""}>
                                    {renderItem(resource)}
                                </ItemWithLink>
                            </>

                        ))}
                    </List>
                )
            }

            {...props}
        />)
}


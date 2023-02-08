
import { List } from "@mui/material"
import { t } from "i18next"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useCreateGroupMutation, useDeleteGroupMutation, useGetAllGroupsQuery, useGetServicesByGroupQuery, usePatchServicesOfGroupMutation, usePutGroupMutation } from "../../feature/stakit/groupsSlice"
import { useGetAllServicesQuery } from "../../feature/stakit/serviceSlice"
import { Group } from "../../models/group"
import { Service } from "../../models/types"
import { DeleteGroupDialog } from "../dialogs/DeleteDialog"
import { Loading } from "../feedback/loading"
import { GroupForm } from "../forms/group"
import { ServiceItem } from "../service"
import { Mode } from "./Mode"
import { ResourceCardProps, ResourceCard, ResourcesCard } from "./ResourceCard"

interface GroupCardProps extends ResourceCardProps<Group> { }


export function GroupCard(props: GroupCardProps) {

    const { resource, isLoading } = props

    let group:Group | undefined = structuredClone(resource);

    let groupService: Service[] = []
    
    const { isLoading: isFetching, data: services } = useGetAllServicesQuery(undefined) 

    if(!isFetching && group && services ) groupService = services.filter(service => (props.resource?.services as string[]).includes(service.uuid!))
   

    let groupId: string = resource?.uuid! 
    
    
    const location = useLocation()
    const [mode, setMode] = useState(location.state?.mode ?? Mode.NORMAL)

    const put = usePutGroupMutation()[0]
    const patchGroup = usePatchServicesOfGroupMutation()[0]

    const remove = useDeleteGroupMutation()[0]
    const { refetch } = useGetAllGroupsQuery(undefined);

    if( isLoading ) return <Loading/> 
    

    const save = (group: Group) =>{
        put(group)
        patchGroup(group)
        refetch()
    }
    return (
        <ResourceCard
            header={group?.name ?? ""}
            subHeader={group?.description ?? ""}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            onDelete={remove}
            onUpdate={(group) => {
              save(group)
            }}
            renderContent={
                <List disablePadding>
                    { groupService.map((service) => <ServiceItem service={service} />)}
                </List>
            }
            padding={0}
            renderForm={(group: Group) => (
                <GroupForm
                    isLoading={isLoading}
                    group={group}
                    onCancel={() => setMode(Mode.NORMAL)}
                    onSubmit={async (group: Group) => {
                        save(group);
                        setMode(Mode.NORMAL)
                    }}
                />
            )}
            deleteDialog={<DeleteGroupDialog
                item={group}
                open={mode === Mode.DELETE}
                onClose={function (): void {
                    setMode(Mode.NORMAL)
                }}
                onSuccess={function (item: Group): void {
                    remove(groupId)
                    refetch()
                    window.history.go(-1)
                }} />
            }
            {...props}
        />
    )
}
interface GroupsCardProps extends Omit<ResourceCardProps<Group>, "resource"> { }

GroupsCard.defaultProps = {
    header: t("Groups"),
    subHeader: t("A list of all groups"),
}

export function GroupsCard(props: GroupsCardProps) {
    const { isLoading, data, refetch } = useGetAllGroupsQuery(undefined)
    const create = useCreateGroupMutation()

    const groups = data ?? []

    const [mode, setMode] = useState<Mode>(Mode.NORMAL)

    return (
        <ResourcesCard
            isLoading={isLoading}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            resources={groups}
            onRefresh={() => { refetch() }}
            renderForm={() => <GroupForm
                onSubmit={async (sub) => {
                    await create[0](sub);
                    setMode(Mode.NORMAL);
                }}
                onCancel={() => {
                    setMode(Mode.NORMAL);
                }} />}
            {...props}
        />
    )
}
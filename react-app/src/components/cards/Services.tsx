import { Can } from "@casl/react"
import { Add, Delete } from "@mui/icons-material"
import { IconButton, ListItem, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material"
import { ReactNode, useContext, useState } from "react"
import { Operation } from "../../feature/authentication/config/ability"
import { UserContext } from "../../feature/authentication/logic/FetchUser"
import { useUpdateServiceMutation, useGetAllServicesQuery, useDeleteServiceMutation, useCreateServiceMutation } from "../../feature/stakit/serviceSlice"
import { Resource, Service } from "../../models/types"
import { Mode } from "./Mode"
import { DeleteServiceDialog } from "../dialogs/DeleteDialog"
import { ServiceForm } from "../forms/service"
import { Action } from "../input/actions/Action"
import { ResourceCard, ResourceCardProps, ResourcesCard, ResourcesCardProps } from "./ResourceCard"
import ReplayIcon from '@mui/icons-material/Replay';
import { ServiceItem } from "../service"
import { useLocation, useParams } from "react-router-dom"

interface ServiceCardProps extends ResourceCardProps<Service> { }

export function ServiceCard(props: ServiceCardProps) {

    const location = useLocation()
    const [mode, setMode] = useState( location.state?.mode ?? Mode.NORMAL)

    const updateService = useUpdateServiceMutation()[0]
    const removeService = useDeleteServiceMutation()[0]

    const { resource: service, isLoading } = props

    return (
        <ResourceCard
            isLoading={isLoading}
            header={service?.name ?? ""}
            subHeader={service?.description ?? ""}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            onDelete={removeService}
            onUpdate={updateService}
            renderForm={(service: Service) => (
                <ServiceForm
                    service={service}
                    onCancel={() => setMode(Mode.NORMAL)}
                    onSubmit={async (service) => { updateService(service); setMode(Mode.NORMAL) }} />
            )}
            deleteDialog={<DeleteServiceDialog
                item={service}
                open={mode === Mode.DELETE}
                onClose={function (): void {
                    setMode(Mode.NORMAL)
                }}
                onSuccess={function (item: Service): void {
                    removeService(item)
                    window.history.go(-1)
                }} />
            }
            {...props}
        />
    )
}
interface ServicesCardProps extends Omit<ResourceCardProps<Service>, "resource"> {}

ServicesCard.defaultProps = {
    header: "Services",
    subHeader: "A list of the latest announcenements",
}

export function ServicesCard(props: ServicesCardProps) {

    const { isLoading, data, refetch } = useGetAllServicesQuery(undefined)
    const create = useCreateServiceMutation()
    
    const services = data ?? []

    const [mode, setMode] = useState<Mode>(Mode.NORMAL)

    const user = useContext(UserContext)

    const Actions = () => (
        <>
            <Action title="Refresh" icon={<Add />} onClick={() => setMode(Mode.ADD)} />
            {user &&
                <Can ability={user.getAbility()} I={Operation.READ} a={Service}>
                    <Action title="Refresh" icon={<ReplayIcon />} onClick={() => refetch()} />
                </Can>
            }
        </>
    )

    return (
        <ResourcesCard
            isLoading={isLoading}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            resources={services}
            renderForm={() => <ServiceForm
                onSubmit={async (sub) => {
                    await create[0](sub);
                    setMode(Mode.NORMAL);
                }}
                onCancel={() => {
                    setMode(Mode.NORMAL);
                }} />}
            renderItem={(item) => <ServiceItem service={item} />}
            extractKey={(service, index) => "service_" + index}
            extractPath={(service) => "/services/" + service.uuid}
            {...props}
        />
    )
}



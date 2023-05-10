import { useState } from "react"
import { usePutServiceMutation, useGetAllServicesQuery, useDeleteServiceMutation, useCreateServiceMutation } from "../../feature/stakit/serviceSlice"
import { Service } from "../../models/types"
import { Mode } from "./Mode"
import { DeleteServiceDialog } from "../dialogs/DeleteDialog"
import { ServiceForm } from "../forms/service"
import { ResourceCard, ResourceCardProps, ResourcesCard, ResourcesCardProps } from "./ResourceCard"
import { ServiceItem } from "../items/service"
import { useLocation } from "react-router-dom"
import { StatusAvatar } from "../status"
import { t } from "i18next"
import { Refresh } from "@mui/icons-material"
import { useKeycloak } from "@react-keycloak/web"

interface ServiceCardProps extends ResourceCardProps<Service> { }

export function ServiceCard(props: ServiceCardProps) {


    const { resource: service, isLoading } = props

    const location = useLocation()
    const [mode, setMode] = useState(location.state?.mode ?? Mode.NORMAL)

    const updateService = usePutServiceMutation()[0]
    const removeService = useDeleteServiceMutation()[0]
    const { refetch } = useGetAllServicesQuery(undefined);

    return (
        <ResourceCard
            avatar={<StatusAvatar status={service?.status} />}
            header={service?.name ?? ""}
            subHeader={service?.description ?? ""}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            onDelete={removeService}
            onUpdate={updateService}

            renderForm={(service: Service) => (
                <ServiceForm
                    isLoading={isLoading}
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
                    refetch()
                    window.history.go(-1)
                }} />
            }
            {...props}
        />
    )
}
interface ServicesCardProps extends Omit<ResourcesCardProps<Service>, "resources"> {
    services?: Service[]
 }

ServicesCard.defaultProps = {
    header: t("Services"),
    subHeader: t("A list of all services"),
}

export function ServicesCard(props: ServicesCardProps) {

    const { isLoading, services, onRefresh } = props
    const create = useCreateServiceMutation()
    
    const [mode, setMode] = useState<Mode>(Mode.NORMAL)
    
    const keycloak = useKeycloak()
    const authenticated = keycloak.initialized && keycloak.keycloak.authenticated

    return (
        <ResourcesCard
            disableLinks={!authenticated}
            isLoading={isLoading}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            resources={services ?? []}
            onRefresh={() => { onRefresh && onRefresh() }}
            renderForm={() => <ServiceForm
                onSubmit={async (sub) => {
                    await create[0](sub);
                    setMode(Mode.NORMAL);
                }}
                onCancel={() => setMode(Mode.NORMAL)} />}
            renderItem={(item) => <ServiceItem service={item} />}
            extractKey={(service, index) => "service_" + index}
            extractPath={(service) => "/services/" + service.uuid}
            {...props}
        />
    )
}



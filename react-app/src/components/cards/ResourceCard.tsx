import { Delete } from "@mui/icons-material"
import { Card, CardContent, CardHeader, Collapse, IconButton, Tooltip } from "@mui/material"
import { ReactNode, useState } from "react"
import { Header } from "../../pages/services/details"
import { Mode as Mode } from "../../pages/services/ServicesPage"
import { Loading } from "../feedback/loading"
import { ServiceForm } from "../forms/service"
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { Service } from "../../models/types"
import { useGetAllServiceQuery, useUpdateServiceMutation } from "../../feature/stakit/serviceSlice"




export function ServiceCard(props: Omit<ResourceCardProps<Service>, "resource">) {
    
    const [mode, setMode] = useState(Mode.NORMAL)

    const updateService = useUpdateServiceMutation()[0]

    const services = useGetAllServiceQuery(undefined)

    return (
        <ResourceCard
            renderForm={(service) => (
                <ServiceForm
                    service={service}
                    onCancel={() => setMode(Mode.NORMAL)}
                    onSubmit={async (service) => { updateService(service) } } />
            )}
            resource={services}
            {...props}
        />
    )
}


interface ResourceCardProps<T> {
    resource: T
    header?: ReactNode
    subHeader?: ReactNode
    renderForm?: (resource: T) => ReactNode
    mode: Mode
    setMode: (mode: Mode) => void
    isLoading: boolean
}

function ResourceCard(props: ResourceCardProps<any>) {

    const actions: { title: string, icon: ReactNode, secondaryIcon?: ReactNode, mode: Mode }[] = [
        { title: "Edit", icon: <EditIcon />, secondaryIcon: <EditOffIcon />, mode: Mode.EDIT },
        { title: "Delete", icon: <Delete />, mode: Mode.DELETE }
    ]

    const { mode, header,subHeader, renderForm, setMode, resource, isLoading} = props
    return (
        <Card>
            <Loading loading={isLoading}>
                <CardHeader
                    title={header}

                    subheader={subHeader}
                    action={<>
                        {actions.map(action => (

                            <Tooltip title={action.title}>
                                <IconButton disabled={mode !== Mode.NORMAL} aria-label={action.title} onClick={() => mode === Mode.NORMAL ? setMode(action.mode) : setMode(Mode.NORMAL)}>
                                    {mode === action.mode ? action.secondaryIcon ?? action.icon : action.icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </>
                    }
                />
                <CardContent>
                    <Collapse in={mode === Mode.EDIT}>
                        {renderForm && renderForm(resource)}
                    </Collapse>
                </CardContent>
            </Loading>
        </Card>
    )
}
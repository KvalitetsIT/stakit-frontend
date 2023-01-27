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
import { useUpdateServiceMutation } from "../../feature/stakit/serviceSlice"


interface ServiceCardProps extends ResourceCardProps<Service> {
    service: Service
    
}

function ServiceCard(props: ServiceCardProps) {
    
    const [mode, setMode] = useState(Mode.NORMAL)

    const updateService = useUpdateServiceMutation()[0]

    return (
        <ResourceCard
            renderForm={(service) => (
                <ServiceForm
                    service={service}
                    onCancel={() => setMode(Mode.NORMAL)}
                    onSubmit={async (service) => { updateService(service) } } />
            )}
            mode={mode}
            setMode={(mode: Mode) => setMode(mode)} 
            resource={props.service}
            isLoading={false}
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

export function ResourceCard(props: ResourceCardProps<any>) {

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
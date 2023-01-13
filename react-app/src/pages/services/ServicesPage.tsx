import { Add } from "@mui/icons-material"
import { Card, CardContent, CardHeader, Collapse, Container, IconButton, List, Tooltip } from "@mui/material"
import { ServicePreview } from "../../components/service"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"
import { ServiceForm } from "../../components/forms/service"
import { useCreateServiceMutation, useGetAllServiceQuery } from "../../feature/api/serviceSlice";
import { Service } from "../../models/types";




export enum Mode {
    NORMAL, EDIT, ADD, DELETE,SUCCESS
}

export function ServicesPage() {

    const { isLoading, data } = useGetAllServiceQuery(undefined)
    const createService = useCreateServiceMutation()[0]

    const services = data

    const [mode, setMode] = useState<Mode>(Mode.NORMAL)

    const addService = async (service: Service) => {
        await createService(service)
        setMode(Mode.NORMAL)
    }

    const actions = [{ title: "Add new service", mode: Mode.ADD, icon: <Add /> }]
    
    return (
        <Container>
            <Card sx={{ mt: 4 }}>
                <CardHeader
                    title="Services"
                    subheader={"A list of all services"}
                    action={<>
                        {actions.map(action => (
                            <Tooltip title={action.title}>
                                <IconButton disabled={mode !== Mode.NORMAL} aria-label={action.title} onClick={() => { mode === Mode.NORMAL ? setMode(action.mode) : setMode(Mode.NORMAL) }}>
                                    {action.icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </>}
                >
                </CardHeader>
                <Collapse in={mode === Mode.ADD}>
                    <CardContent>
                        <ServiceForm onSubmit={addService} onCancel={() => setMode(Mode.NORMAL)} service={undefined} optionalGroups={[]}></ServiceForm>

                    </CardContent>
                </Collapse>
                {services && services.length > 0 && (
                    <CardContent sx={{ padding: 0 }}>
                        <List>
                            {
                                services && services.map(service => (
                                    <ServicePreview service={service} showPath></ServicePreview>
                                ))
                            }
                        </List>
                    </CardContent>
                )}
            </Card>


        </Container>

    )
}

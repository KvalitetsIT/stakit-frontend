import { Add, Refresh } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Collapse, Container, IconButton, List, Tooltip } from "@mui/material";
import { ServiceItem } from "../../components/service";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { ServiceForm } from "../../components/forms/service";
import { useCreateServiceMutation, useGetAllServiceQuery } from "../../feature/stakit/serviceSlice";
import { Service } from "../../models/types";

export enum Mode {
    NORMAL, EDIT, ADD, DELETE, SUCCESS
}

export function ServicesPage() {

    //const { isLoading, data } = useGetAllServiceQuery(undefined)
    const createService = useCreateServiceMutation()[0]

    const {isLoading, data: services} = useGetAllServiceQuery(undefined)

    const [mode, setMode] = useState<Mode>(Mode.NORMAL)

    const addService = async (service: Service) => {
        createService(service)
        setMode(Mode.NORMAL)
    }

    const actions = [{ title: "Add new service", mode: Mode.ADD, icon: <Add /> }, {title: "Refresh", mode: Mode.NORMAL, icon: <Refresh/>}]
    
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
                        
                    </>}
                >
                </CardHeader>
                <Collapse in={mode === Mode.ADD}>
                    <CardContent>
                        <ServiceForm onSubmit={addService} onCancel={() => setMode(Mode.NORMAL)} service={undefined}></ServiceForm>

                    </CardContent>
                </Collapse>
                {services && services.length > 0 && (
                    <CardContent sx={{ padding: 0 }}>
                        <List>
                            {
                                services && services.map((service: Service) => (
                                    <ServiceItem service={service} showPath></ServiceItem>
                                ))
                            }
                        </List>
                    </CardContent>
                )}
            </Card>


        </Container>

    )
}

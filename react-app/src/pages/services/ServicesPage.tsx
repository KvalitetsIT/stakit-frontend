import { Add } from "@mui/icons-material"
import { Card, CardContent, CardHeader, Collapse, Container, IconButton, List, Tooltip } from "@mui/material"
import { ServicePreview } from "../../components/service"
import { mock } from "../../MockedData"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"
import { ServiceForm } from "../../components/forms/service"
import { wait } from "@testing-library/user-event/dist/utils"


export function ServicesPage() {


    const enum modes {
        NORMAL, EDIT, ADD
    }

    const services = mock.groups.flatMap(group => group.services)

    const [mode, setMode] = useState<modes>(modes.NORMAL)

    const addService = async () => {
        await wait(5000)
        setMode(modes.NORMAL)
    }

    const actions = [{ title: "Add new service", mode: modes.ADD, icon: <Add /> }]

    return (
        <Container>
            <Card sx={{ mt: 4 }}>
                <CardHeader

                    title="Services"
                    subheader={"A list of all services"}
                    action={<>
                        {actions.map(action => (
                            <Tooltip title={action.title}>
                                <IconButton disabled={mode !== modes.NORMAL} aria-label={action.title} onClick={() => { mode === modes.NORMAL ? setMode(action.mode) : setMode(modes.NORMAL) }}>
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
                <Collapse in={mode === modes.ADD}>
                    <CardContent>
                        <ServiceForm onSubmit={addService} onCancel={() => setMode(modes.NORMAL)} service={undefined} optionalGroups={[]}></ServiceForm>

                    </CardContent>
                </Collapse>
                <CardContent sx={{ padding: 0 }}>

                    <List>
                        {
                            services.map(service => (
                                <ServicePreview service={service} showPath></ServicePreview>
                            ))
                        }
                    </List>
                </CardContent>
            </Card>


        </Container>

    )
}

import { Add } from "@mui/icons-material"
import { Container, Card, CardHeader, IconButton, Collapse, CardContent, Tooltip } from "@mui/material"
import { useState } from "react"
import { Mode } from "../services/ServicesPage"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GroupForm } from "../../components/forms/group"
import { useCreateGroupMutation, useGetAllGroupsQuery } from "../../feature/stakit/groupsSlice"
import { GroupAccordion } from "../../components/group"
import { useGetAllServiceQuery } from "../../feature/stakit/serviceSlice"
import { Group } from "../../models/group";

export function AllGoupsPage(props: {}) {

    const { isLoading, data: groups } = useGetAllGroupsQuery(undefined)

    const createGroup = useCreateGroupMutation()[0]
    const [mode, setMode] = useState<Mode>(Mode.NORMAL)

    const addGroup = async (group: Group) => {
        await createGroup(group)
        setMode(Mode.NORMAL)
    }

    const actions = [{ title: "Add new group", mode: Mode.ADD, icon: <Add /> }]

    return (
        <>
            <Container>
                <Card sx={{ mt: 4 }}>
                    <CardHeader
                        title="Groups"
                        subheader={"A list of all groups"}
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
                            <GroupForm
                                onSubmit={addGroup}
                                onCancel={() => setMode(Mode.NORMAL)}
                            />
                        </CardContent>
                    </Collapse>
                </Card>

                {
                    groups && groups.map(group => (
                        <GroupAccordion group={group}></GroupAccordion>
                    ))
                }



            </Container>
        </>
    )
}
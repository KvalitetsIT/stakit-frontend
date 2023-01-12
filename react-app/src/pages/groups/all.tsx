import { Add } from "@mui/icons-material"
import { Container, Card, CardHeader, IconButton, Collapse, CardContent, Tooltip } from "@mui/material"
import { useState } from "react"
import { Group } from "../../models/types"
import { modes } from "../services/ServicesPage"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EditGroupForm } from "../../components/forms/group"
import { useCreateGroupMutation, useGetAllGroupsQuery } from "../../feature/api/groupsSlice"
import { GroupAccordion } from "../../components/group"

export function AllGoupsPage(props: {}) {

    const { isLoading, data } = useGetAllGroupsQuery(undefined)
    const createGroup = useCreateGroupMutation()[0]

    const groups = data

    const [mode, setMode] = useState<modes>(modes.NORMAL)

    const addGroup = async (group: Group) => {
        await createGroup(group)
        setMode(modes.NORMAL)
    }

    const actions = [{ title: "Add new group", mode: modes.ADD, icon: <Add /> }]


    console.log(groups)

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
                            <EditGroupForm onSubmit={addGroup} onCancel={() => setMode(modes.NORMAL)}></EditGroupForm>
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
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { groupsSlice } from "../feature/reducers/groups";
import { Group } from "../models/types";

export function TestPage() {

   // const groups = useSelector((state: { groups: Cluster[] }) => state.groups)
    const dispatch = useDispatch()

//    const {isError, isLoading, isSuccess, isUninitialized, isFetching} = useGetAllAnnouncementsQuery(undefined)


    const { load } = groupsSlice.actions

    return (

        <>
            <Card>
                <CardHeader title="Root"></CardHeader>

                <CardContent>
                    <Button onClick={() => dispatch(load())}>Load</Button>

                </CardContent>
            </Card>
            <Something />
        </>
    )

}

function Something() {

  //  const groups = useSelector((state: { groups: { groups: Cluster[] } }) => state.groups.groups)

    return (
        <>
            <Card>
                <CardHeader title="Something"></CardHeader>

                <CardContent>
                    {/*groups[0].name*/}
                </CardContent>
            </Card>

        </>
    )
}




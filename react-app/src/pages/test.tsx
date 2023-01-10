import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { EditGroupForm } from "../components/forms/group";

export function TestPage() {

    // const groups = useSelector((state: { groups: Cluster[] }) => state.groups)
    const dispatch = useDispatch()

    // const {isError, isLoading, isSuccess, isUninitialized, isFetching} = useGetAllAnnouncementsQuery(undefined)


    return (

        <>
        <Typography variant="h4">Test Page</Typography>


        <EditGroupForm onSubmit={() => toast("Submit")} onCancel={() => toast("Submit")}></EditGroupForm>


        </>
    )

}


import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { GroupForm } from "../components/forms/group";
import { Logo } from "../components/icons/logo";

export function TestPage() {

    // const groups = useSelector((state: { groups: Cluster[] }) => state.groups)
    const dispatch = useDispatch()

    // const {isError, isLoading, isSuccess, isUninitialized, isFetching} = useGetAllAnnouncementsQuery(undefined)


    return (

        <>
            <Typography variant="h4">Test Page</Typography>


            <Logo></Logo>
        </>
    )

}


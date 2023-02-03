import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ServiceCard } from "../components/cards/Services";
import { GroupForm } from "../components/forms/group";
import { Logo } from "../components/icons/logo";
import { useGetAllServicesQuery, useGetServiceQuery } from "../feature/stakit/serviceSlice";
import { Service } from "../models/types";
import { Mode } from "../components/cards/Mode";

export function TestPage() {

    // const groups = useSelector((state: { groups: Cluster[] }) => state.groups)
    const dispatch = useDispatch()




    const {data} = useGetAllServicesQuery(undefined)

    const service = data && data[0]

    return (
        <>
            <Typography variant="h4">Test Page</Typography>

        
        </>
    )

}


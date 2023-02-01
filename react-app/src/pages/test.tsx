import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ServiceCard } from "../components/cards/ResourceCard";
import { GroupForm } from "../components/forms/group";
import { Logo } from "../components/icons/logo";
import { useGetAllServiceQuery, useGetServiceQuery } from "../feature/stakit/serviceSlice";
import { Service } from "../models/types";
import { Mode } from "./services/ServicesPage";

export function TestPage() {

    // const groups = useSelector((state: { groups: Cluster[] }) => state.groups)
    const dispatch = useDispatch()

    // const {isError, isLoading, isSuccess, isUninitialized, isFetching} = useGetAllAnnouncementsQuery(undefined)

    return (
        <>
            <Typography variant="h4">Test Page</Typography>

        </>
    )

}


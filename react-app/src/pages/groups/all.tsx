import { Container } from "@mui/material";
import { useGetAllGroupsQuery } from "../../feature/stakit/groupsSlice";
import { GroupAccordion } from "../../components/accordion/group";
import { GroupsCard } from "../../components/cards/Groups";
import { Group } from "../../models/group";
import { Service } from "../../models/types";
import { useGetAllServicesQuery } from "../../feature/stakit/serviceSlice";

export function AllGoupsPage(props: {}) {

    const { isLoading, data, refetch } = useGetAllGroupsQuery(undefined)

    const { isLoading: isLoadingServices, data: services } = useGetAllServicesQuery(undefined)

    if (isLoadingServices || isLoading) return <></>

    const groups = data && data.map(group => Mapper.groupToModel(group, services))

    return (
        <>
            <Container>
                <GroupsCard isLoading={isLoading} onRefresh={() => refetch()} />
                {
                    groups && groups.map(group => <GroupAccordion group={group }></GroupAccordion>)
                }
            </Container>
        </>
    )
}

class Mapper {
    
    static groupToModel(group: Group, services?: Service[]): Group {
        let result = structuredClone(group)
        if (typeof group.services[0] === "string") {
            result.services = services ? services.filter(service => (group.services as string[]).includes(service?.uuid!)) : []
            return result
        }
        return group
    }


}


import { MutationDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query"
import { UseMutation } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { group } from "console"
import { boolean } from "yup"
import { groupSlice, useGetAllGroupsQuery } from "./groupsSlice"
import { serviceSlice } from "./serviceSlice"


// const { useGetAllServiceQuery, useCreateServiceMutation, useLazyGetServiceQuery } = serviceSlice

// export function useGetAllGroupsCascaded(): { isLoading: boolean; data: Group[] } {

//     const { isLoading: groupsIsLoading, data: groupDtos } = useGetAllGroupsQuery(undefined)
//     const { isLoading: servicesIsLoading, data: serviceDtos } = useGetAllServiceQuery(undefined)

//     let groups = groupDtos ? groupDtos.map((dto: GroupDto) => mergeGroup(dto, serviceDtos ?? [])) : []

//     return { isLoading: (groupsIsLoading || servicesIsLoading), data: groups };
// }


// function mergeGroup(dto: GroupDto, services: ServiceDto[]): Group {

//     let group = JSON.parse(JSON.stringify(dto as unknown as Group))

//     group.services = services.filter(service => service?.uuid !== undefined ? dto.services.includes(service.uuid) : false)

//     return group;

// }


// export function useGetAllServicesCascaded(): { isLoading: boolean; data: Service[] } {

//     const { isLoading: groupsIsLoading, data: groupDtos } = useGetAllGroupsQuery(undefined)
//     const { isLoading: servicesIsLoading, data: serviceDtos } = useGetAllServiceQuery(undefined)

//     let services = serviceDtos ? serviceDtos.map((dto: ServiceDto) => mergeService(dto, groupDtos ?? [])) : []

//     return { isLoading: (groupsIsLoading || servicesIsLoading), data: services };
// }


// function mergeService(dto: ServiceDto, groups: GroupDto[]): Service {

//     let service = JSON.parse(JSON.stringify(dto as unknown as Service))

//     let ids = groups.map(group => group.uuid)

//     service.group = groups.filter(group => group?.uuid !== undefined ? ids.includes(group.uuid) : false)

//     return service;

// }


// export function useCreateService(): (service: Service) => void {
//     const createService = useCreateServiceMutation()[0]
//     return async (service: Service) => {
//         let dto: ServiceDto = service as ServiceDto;
//         dto.group = service.group?.uuid;

//         await createService(dto)
//     }
// }
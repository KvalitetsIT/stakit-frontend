
import { Group } from '../../models/group';
import { Service } from '../../models/types';
import HandleQuery from '../../redux/EndpointQueryHandler';
//import handleResponse from '../redux/handleResponse';
import handleResponse from '../../redux/handleResponse';
import { stakitApiSlice } from '../../redux/stakit-api-slice';


// Define a Group using a base URL and expected endpoints
export const groupSlice = stakitApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroups: builder.query<Group[], undefined>({
      query: () => HandleQuery({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `groups`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Groups could not be fetched" }),
      }), 
      providesTags: ["groups"]
    }),
    getGroup: builder.query<Group, string>({
      query: (id) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `groups/${id}`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Group could not be fetched" }),
      }),
      providesTags: ["groups"]
    }),
    createGroup: builder.mutation<Group, Group>({
      query: (request) => {
        
        const body = groupToDTO(request)

        return HandleQuery({
        url: `groups`,
        responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Group was created", toastErrorText: "Group could not be created" }),
        method: 'POST',
        body: body,
      })},
      invalidatesTags: ['groups'],
    }),
    putGroup: builder.mutation<Group, Group>({
      query: (request) => {
        
        const body = groupToDTO(request)

        return HandleQuery({
        url: `groups/${request.uuid}`,
        responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Group was updated", toastErrorText: "Group could not be created" }),
        method: 'PUT',
        body: body,
      })},
      invalidatesTags: ["groups"]
    }),
    deleteGroup: builder.mutation<undefined, string>({
      query: (id) => HandleQuery({
        url: `groups/${id}`,
        method: "DELETE",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Group could not be deleted" }),
      }),
      invalidatesTags: ['groups'],
    }),
    getServicesByGroup: builder.query<Service[], string>({
      query: (id) => HandleQuery({
        url: `groups/${id}/services`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Services of the given group could not be fetched" }),
      }),
      providesTags: ['group-services'],
    }),
    patchServicesOfGroup: builder.mutation<Group, Group>({
      query: (request) => HandleQuery({
        url: `groups/${request.uuid}`,
        method: "PATCH",
        body: groupToDTO(request).services,
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Services of the given group could not be fetched" }),
      }),
      invalidatesTags: ['group-services'],
    })
  })
})

export const { useLazyGetGroupQuery, useCreateGroupMutation, useGetServicesByGroupQuery, useDeleteGroupMutation, useGetAllGroupsQuery, usePutGroupMutation, useGetGroupQuery} = groupSlice


function groupToDTO(group: Group): Group{

  let result = structuredClone(group) 

  if( typeof group.services[0] === "string") return result

  result.services = (group.services as Service[]).map(service => service.uuid)
  
  return result
  
}




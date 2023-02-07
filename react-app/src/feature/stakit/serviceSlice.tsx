
import { group } from 'console';
import { Group } from '../../models/group';
import { Service } from '../../models/types';
import HandleQuery from '../../redux/EndpointQueryHandler';
//import handleResponse from '../redux/handleResponse';
import handleResponse from '../../redux/handleResponse';
import { stakitApiSlice } from '../../redux/stakit-api-slice';




// Define a service using a base URL and expected endpoints
export const serviceSlice = stakitApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<Service[], undefined>({
      query: () => HandleQuery({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `services`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Services could not be fetched" }),
      }),
      providesTags: ["services"]
    }),
    getService: builder.query<Service, string>({
      query: (id) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `services/${id}`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Services could not be fetched" }),
      }),
      providesTags: ["services"]
    }),
    createService: builder.mutation<Service, Service>({
      query: (request) => HandleQuery({
        url: `services`,
        responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Service was created", toastErrorText: "Service could not be created" }),
        method: 'POST',
        body: serviceToDTO(request),
      }),
      invalidatesTags: ['services'],
    }),
    putService: builder.mutation<Service, Service>({
      query: (request) => {
        return HandleQuery({
          url: `services/${request.uuid}`,
          responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Service was updated", toastErrorText: "Service could not be created" }),
          method: 'PUT',
          body: serviceToDTO(request),
        })
      },
      invalidatesTags: ['services'],
    }),
    deleteService: builder.mutation<undefined, Service>({
      query: (request) => HandleQuery({
        url: `services/${request.uuid}`,
        method: "DELETE",
      })

    })

  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateServiceMutation, usePutServiceMutation, useGetAllServicesQuery, useDeleteServiceMutation, useGetServiceQuery } = serviceSlice


export function serviceToDTO(service: Service): Service {
  let result = structuredClone(service)
  if (typeof service.group === "string") return result
  result.group = (service.group as Group).uuid
  return result
}
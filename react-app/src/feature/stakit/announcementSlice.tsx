
import { Announcement } from '../../models/types';
import HandleQuery from '../../redux/EndpointQueryHandler';
//import handleResponse from '../redux/handleResponse';
import handleResponse from '../../redux/handleResponse';
import { stakitApiSlice } from '../../redux/stakit-api-slice';




// Define a service using a base URL and expected endpoints
export const announcementSlice = stakitApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getAllAnnouncements: builder.query<Announcement[], undefined>({
      query: (id) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `announcements`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Services could not be fetched" }),
      }),
      providesTags: ["announcements"]
    }),
    getAnnouncement: builder.query<Announcement, string>({
      query: (id) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `announcements/${id}`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Service could not be fetched" }),
      }),
      providesTags: ["announcements"]
    }),
    createAnnouncement: builder.mutation<Announcement, Announcement>({
      query: (request) => HandleQuery({
        url: `announcements`,
        responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Announcement was created", toastErrorText: "Announcement could not be created" }),
        method: 'POST',
        body: request,
        
      }),
      invalidatesTags: ['announcements'],
    }),
    updateAnnouncement: builder.mutation<Announcement, Announcement>({
      query: (request) => HandleQuery({
        url: `announcements/${request.uuid}`,
        responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Announcement was updated", toastErrorText: "Announcement could not be updated" }),
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ['announcements'],
    }),
    deleteAnnouncement: builder.mutation<undefined, Announcement>({
      query: (request) => HandleQuery({
        url: `announcements/${request.uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ['announcements'],
    })

  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllAnnouncementsQuery, useGetAnnouncementQuery, useCreateAnnouncementMutation, useUpdateAnnouncementMutation, useDeleteAnnouncementMutation } = announcementSlice

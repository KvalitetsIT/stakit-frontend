
import {  Group } from '../../models/group';
import { Announcement, Subscription } from '../../models/types';
import HandleQuery from '../../redux/EndpointQueryHandler';
import handleResponse from '../../redux/handleResponse';
import { stakitApiSlice } from '../../redux/stakit-api-slice';


// Define a service using a base URL and expected endpoints
export const announcementSlice = stakitApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAnnouncements: builder.query<Announcement[], undefined>({
            query: () => HandleQuery({
                //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
                url: `announcements-to-show`,
                method: "GET",
                responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Announcements could not be fetched" }),
            }),
            providesTags: ["announcements"]
        }),
        getStatusOfGroups: builder.query<Group[], undefined>({
            query: () => HandleQuery({
                //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
                url: `service-status-grouped`,
                method: "GET",
                responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Groups could not be fetched" }),
            }),
            providesTags: ["statusOfGroups"]
        }),
        createSubscription: builder.mutation<string, Subscription>({
            query: (request) => HandleQuery({
                //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
                url: `subscriptions`,
                method: "POST",
                body: request,
                responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Could not create subscription" }),
            }),
            invalidatesTags: ["subscriptions"]
        }),
        confirmSubscription: builder.query<undefined, string>({
            query: (id) => HandleQuery({
                //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
                url: `subscribe-confirm/${id}`,
                method: "GET",
                responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Could not confirm subscription" }),
            }),
            providesTags: ["confirmSubscription"]
        }),
        unsubscribe: builder.query<undefined, string>({
            query: (id) => HandleQuery({
                //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
                url: `subscriptions/${id}`,
                method: "DELETE",
                responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Could not unsubscribe" }),
            }),
            providesTags: ["unsubscribe"]
        }),

    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAnnouncementsQuery, useCreateSubscriptionMutation, useGetStatusOfGroupsQuery, useConfirmSubscriptionQuery, useUnsubscribeQuery } = announcementSlice

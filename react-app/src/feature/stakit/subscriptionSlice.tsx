
import { Group } from '../../models/group';
import { Subscription } from '../../models/types';
import HandleQuery from '../../redux/EndpointQueryHandler';
import handleResponse from '../../redux/handleResponse';
import { stakitApiSlice } from '../../redux/stakit-api-slice';




// Define a subscription using a base URL and expected endpoints
export const subscriptionSlice = stakitApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query<Subscription[], undefined>({
      query: () => HandleQuery({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `subscriptions`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Subscriptions could not be fetched" }),
      }),
      providesTags: ["subscriptions"]
    }),
    getSubscription: builder.query<Subscription, string>({
      query: (id) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `subscriptions/${id}`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Subscriptions could not be fetched" }),
      }),
      providesTags: ["subscriptions"]
    }),
    createSubscription: builder.mutation<Subscription, Subscription>({
      query: (request) => HandleQuery({
        url: `subscriptions`,
        responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Subscription was created", toastErrorText: "Subscription could not be created" }),
        method: 'POST',
        body: subscriptionToDTO(request),
      }),
      invalidatesTags: ['subscriptions'],
    }),
    putSubscription: builder.mutation<Subscription, Subscription>({
      query: (request) => {
        return HandleQuery({
          url: `subscriptions/${request.uuid}`,
          responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Subscription was updated", toastErrorText: "Subscription could not be created" }),
          method: 'PUT',
          body: subscriptionToDTO(request),
        })
      },
      invalidatesTags: ['subscriptions'],
    }),
    deleteSubscription: builder.mutation<undefined, Subscription>({
      query: (request) => HandleQuery({
        url: `subscriptions/${request.uuid}`,
        method: "DELETE",
      })

    })

  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateSubscriptionMutation, usePutSubscriptionMutation, useGetAllSubscriptionsQuery, useDeleteSubscriptionMutation, useGetSubscriptionQuery } = subscriptionSlice


export function subscriptionToDTO(subscription: Subscription): Subscription {
  let result = structuredClone(subscription)
  
  if( typeof subscription.groups[0] === "string") return result

  result.groups = (subscription.groups as Group[]).map(group => group.uuid)
  
  return result
}
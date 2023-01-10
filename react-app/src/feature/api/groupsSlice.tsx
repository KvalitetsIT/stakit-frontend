
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { group } from 'console';
import { t } from 'i18next';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Group } from '../../models/types';
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
    getGroup: builder.query<Group[], string>({
      query: (id) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `groups/${id}`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Groups could not be fetched" }),
      }),
      providesTags: ["groups"]
    }),
    createGroup: builder.mutation<Group, Group>({
      query: (request) => HandleQuery({
        url: `groups`,
        responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Group was created", toastErrorText: "Group could not be created" }),
        method: 'POST',
        body: request,
        
      }),
      invalidatesTags: ['groups'],
    }),
    updateGroup: builder.mutation<Group, Group>({
      query: (request) => HandleQuery({
        url: `groups/${request.id}`,
        responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Group was created", toastErrorText: "Group could not be created" }),
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: ["groups"]
    }),
    deleteGroup: builder.mutation<undefined, Group>({
      query: (request) => HandleQuery({
        url: `groups/${request.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['groups'],
    })  
  })
})

export const {useCreateGroupMutation, useGetAllGroupsQuery} = groupSlice

import { Can } from '@casl/react';
import { Http } from '@mui/icons-material';
import { createApi } from '@reduxjs/toolkit/query/react'
import { t } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import getEnvironment from '../../env';
import { Service } from '../../models/types';
import fetchDefaultBaseQuery from '../../redux/BaseQuerySettings'
import HandleQuery from '../../redux/EndpointQueryHandler';
import { GetManyPackage } from '../../redux/GetManyPackage';
//import handleResponse from '../redux/handleResponse';
import handleResponse from '../../redux/handleResponse';
import { stakitApiSlice } from '../../redux/stakit-api-slice';




// Define a service using a base URL and expected endpoints
export const serviceSlice = stakitApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query<Service[], undefined>({
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
        body: request,
        
      }),
      invalidatesTags: ['services'],
    }),
    updateService: builder.mutation<Service, Service>({
      query: (request) => HandleQuery({
        url: `services/${request.id}`,
        responseHandler: (res) => handleResponse({ response: res, toastSuccessText: "Service was created", toastErrorText: "Service could not be created" }),
        method: 'PUT',
        body: request,
        
      }),
      invalidatesTags: ['services'],
    }),
    deleteService: builder.mutation<undefined, Service>({
      query: (request) => HandleQuery({
        url: `services/${request.id}`,
        method: "DELETE",
      })
    })

  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateServiceMutation, useGetAllServiceQuery, useGetServiceQuery , useLazyGetAllServiceQuery, useDeleteServiceMutation} = serviceSlice



// export default class Todo {
//   id?: number
//   authorId?: number
//   text?: String
// }

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getEnvironment from '../../../env'
import Todo from '../../../models/todo'
import fetchDefaultBaseQuery from '../../../redux/BaseQuerySettings'
import { GetManyPackage } from '../../../redux/GetManyPackage'
import handleResponse from '../../../redux/handleResponse'
import { transformMultipleResponseToRightType } from '../../../redux/transformResponse'

const baseurl = getEnvironment().REACT_APP_API_BASEURL;

// Define a service using a base URL and expected endpoints
export const postApiSlice = createApi({
  reducerPath: 'todos',
  baseQuery: fetchDefaultBaseQuery(),
  tagTypes: ['todos'],
  endpoints: (builder) => ({
    getAllPosts: builder.query<Todo[], GetManyPackage>({
      query: (pack) => ({
        url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Todos could not be fetched" }),
      }),
      transformResponse: (a: Todo[], b, c) => transformMultipleResponseToRightType(Todo, a, b, c),
      providesTags: (result = [], error, arg) => [
        'todos',
        ...result.map(({ id }) => ({ type: 'todos', uuid: id }) as const)
      ]
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllPostsQuery } = postApiSlice
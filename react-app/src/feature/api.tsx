
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getEnvironment from '../env';
import fetchDefaultBaseQuery from '../redux/BaseQuerySettings'
import { GetManyPackage } from '../redux/GetManyPackage';
//import handleResponse from '../redux/handleResponse';
import handleResponse from '../redux/handleResponse';
import { transformMultipleResponseToRightType, transformSingleResponseToRightType } from '../redux/transformResponse';
import {Announcement} from "../models/types"


const services = "/services"
const groups = "/services"
const announcements = "/announcements"


export const api = createApi({
    reducerPath: 'health-api',
    baseQuery: fetchDefaultBaseQuery(),
    endpoints: (builder) => ({})
})
  export const {  } = api


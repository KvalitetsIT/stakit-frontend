import { createApi } from '@reduxjs/toolkit/query/react'
import fetchDefaultBaseQuery from './BaseQuerySettings'

export const stakitApiSlice = createApi({
    reducerPath: 'stakit_api',
    tagTypes: [
        'services', 'service',
        'groups', 'group',
        'users', 'user',
        "announcements", "announcement",
        "statusOfGroups", "subscription", "confirmSubscription"
        
    ],
    
    baseQuery: fetchDefaultBaseQuery(),
    endpoints: () => ({}),
})



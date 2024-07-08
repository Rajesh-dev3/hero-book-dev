// 
// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from '../badRequestHandler/BadRequestHandler'

// Define a service using a base URL and expected endpoints
export const eventSession = createApi({
  reducerPath: 'EventSession',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getEventSession: builder.mutation({
      query: (body) => ({
        url: "event-session",
        method: "POST",
        body
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEventSessionMutation } = eventSession
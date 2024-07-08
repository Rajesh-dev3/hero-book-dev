


// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from '../badRequestHandler/BadRequestHandler'

// Define a service using a base URL and expected endpoints
export const eventDetails = createApi({
  reducerPath: 'eventdetails',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getEventDetails: builder.mutation({
      query: (body) => ({
    url:"event-detals",
    method:"POST" ,
    body
    }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEventDetailsMutation } = eventDetails
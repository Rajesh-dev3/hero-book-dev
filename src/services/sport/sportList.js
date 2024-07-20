// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from '../badRequestHandler/BadRequestHandler'

// Define a service using a base URL and expected endpoints
export const sportList = createApi({
  reducerPath: 'sportList',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getSportList: builder.mutation({
      query: (body) => ({
        url: "v5/getSportOuterList",
        method: "POST",
        body
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSportListMutation } = sportList
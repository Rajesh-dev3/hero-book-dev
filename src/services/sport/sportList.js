// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const sportList = createApi({
  reducerPath: 'sportList',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bigbetexchange.com/api/v5/' }),
  endpoints: (builder) => ({
    getSportList: builder.mutation({
      query: (body) => ({
    url:"getSportOuterList",
    method:"POST" ,
    body
    }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSportListMutation } = sportList
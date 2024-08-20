

// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from "../badRequestHandler/BadRequestHandler"

// Define a service using a base URL and expected endpoints
export const login = createApi({
  reducerPath: 'login',
  baseQuery: dynamicBaseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://52.66.201.64:8786/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "v5/login",
        method: "POST",
        body
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = login
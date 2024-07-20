
// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from "../badRequestHandler/BadRequestHandler"

// Define a service using a base URL and expected endpoints
export const changePassword = createApi({
  reducerPath: 'changePassword',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (body) => ({
        url: "v5/update-info",
        method: "POST",
        body
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useChangePasswordMutation } = changePassword
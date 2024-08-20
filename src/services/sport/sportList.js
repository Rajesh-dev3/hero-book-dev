// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from '../badRequestHandler/BadRequestHandler'

// Define a service using a base URL and expected endpoints
const baseQuery = async (args, api, extraOptions) => {
  const token = localStorage.getItem("token");
const result = await fetchBaseQuery({
  baseUrl: 'https://exchthanos.com/api/',
  prepareHeaders: (headers) => {
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
})(args, api, extraOptions);



return result;
};

export const sportList = createApi({
  reducerPath: 'sportList',
  
  baseQuery: baseQuery,
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
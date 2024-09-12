// Import necessary functions and types from Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a custom base query function that includes authorization headers
const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://52.66.201.64:8786/api/',
  baseUrl: "https://bigbetexchange.com/api/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the API service
export const saveTelegramDisableCode = createApi({
  reducerPath: 'saveTelegramDisableCode',
  baseQuery,
  endpoints: (builder) => ({
  
    telegramDisable: builder.mutation({
      query: (body) => ({
        url: 'v5/telegramDisableCodeVeify',
        method: 'POST',
        body,
      }),
    }),
    getConnectionId: builder.mutation({
      query: (body) => ({
        url: 'v5/getConnectionId',
        method: 'POST',
        body,
      }),
    }),
    saveTelegramDisableCode: builder.mutation({
      query: (body) => ({
        url: 'v5/saveTelegramDisableCode',
        method: 'POST',
        body,
      }),
    }),
    teleConnectedStatus: builder.mutation({
      query: (body) => ({
        url: 'v5/teleConnectedStatus',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export the hook for using the mutation in functional components
export const {useTeleConnectedStatusMutation, useSaveTelegramDisableCodeMutation,useTelegramDisableMutation,useGetConnectionIdMutation } = saveTelegramDisableCode;

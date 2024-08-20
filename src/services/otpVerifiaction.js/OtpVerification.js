// Import necessary functions and types from Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { dynamicBaseQuery } from '../badRequestHandler/BadRequestHandler';

// Define a custom base query function that includes authorization headers



const baseQuery = async (args, api, extraOptions) => {
  const token = localStorage.getItem("telegramToken");

  const result = await fetchBaseQuery({
    baseUrl: "http://52.66.201.64:8786/api",
    // baseUrl: 'https://exchthanos.com/api/',
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  if (result.error) {
    if(!result.error?.data?.success){
      toast.error(result.error?.data?.message)
    }
  }

  return result;
};

// Define the API service
export const telegramOtpVerification = createApi({
  reducerPath: 'telegramOtpVerification',
  baseQuery,
  // baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    otpVerification: builder.mutation({
      query: (body) => ({
        url: 'v5/verifyLoginCodeTelegram',
        method: 'POST',
        body,
      }),
    }),
   
  }),
});

// Export the hook for using the mutation in functional components
export const { useOtpVerificationMutation } = telegramOtpVerification;

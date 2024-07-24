
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const scoreBoard = createApi({
  reducerPath: 'scoreBoard',
  baseQuery:fetchBaseQuery({ baseUrl: 'https://score.jeoad.com/api/v1/' }) ,
  endpoints: (builder) => ({
    scoreBoard: builder.query({
      query: (body) => `getScore?matchId=${body}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useScoreBoardQuery } = scoreBoard
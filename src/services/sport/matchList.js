// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import {dynamicBaseQuery} from "../badRequestHandler/BadRequestHandler"

// Define a service using a base URL and expected endpoints
export const matchList = createApi({
  reducerPath: 'matchList',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getmatchList: builder.mutation({
      query: (body) => ({
    url:"v5/event-game-list",
    method:"POST",
    body
    }),
    }),
    gameEventlist: builder.mutation({
      query: (body) => ({
    url:"v5/game-event-list",
    method:"POST",
    body
    }),
    }),
    eventGame: builder.mutation({
      query: (body) => ({
    url:"v5/event-game",
    method:"POST",
    body
    }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetmatchListMutation,useGameEventlistMutation,useEventGameMutation } = matchList
import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "../badRequestHandler/BadRequestHandler";

export const betPlace = createApi({
  reducerPath: 'betPlace',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    betPlace: builder.mutation({
      query: (body) => {
        const url = body?.isFancy ? 'v5/save-ssn-bet' : 'v5/save-bet';
        // Remove the isFancy key from the body if it exists
        const { isFancy, ...restBody } = body;
        
        return {
          url,
          method: 'POST',
          body: restBody,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useBetPlaceMutation } = betPlace;

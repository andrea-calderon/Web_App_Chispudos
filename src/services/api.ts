import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/',
  }),
  endpoints: (builder) => ({
    getExampleData: builder.query<any, void>({
      query: () => 'users/1',
    }),
    login: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
    // Add other endpoints here
  }),
});

export const { useGetExampleDataQuery, useLoginMutation } = api;
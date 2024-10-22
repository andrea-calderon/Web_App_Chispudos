import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store/store';
import { selectAuth } from '../redux/slices/authSlice';
import { UserResponseType, ApiResponseType, LoginValues } from '../types/api/apiResponses';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const authState = selectAuth(getState() as RootState);
      const token = authState.token;
      if (token) headers.set('Authorization', `${token}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExampleData: builder.query<ApiResponseType<UserResponseType[]>, void>({
      query: () => 'users/',
    }),
    login: builder.mutation<
      ApiResponseType<{ user: UserResponseType; token: string }>,
      LoginValues
    >({
      query: (credentials) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    // Add other endpoints here
  }),
});

export const { useGetExampleDataQuery, useLoginMutation } = api;

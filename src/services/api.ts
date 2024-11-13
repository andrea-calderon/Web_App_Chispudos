import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store/store';
import { selectAuth } from '../redux/slices/authSlice';
import { UserResponseType, ApiResponseType } from '../types/api/apiResponses';
import { LoginValues } from '../types/api/apiRequests';
import { logout } from '../redux/slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const authState = selectAuth(getState() as RootState);
    const token = authState.token;
    if (token) headers.set('Authorization', `${token}`);
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Custom baseQuery to handle 401/403 responses
const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  // Check for 401 or 403 status codes
  const errorStatus =
    result.error?.status === 401 || result.error?.status === 403;
  const errorOriginalStatus =
    result.error?.originalStatus === 401 || result.error?.originalStatus === 403;
  if (errorStatus || errorOriginalStatus) api.dispatch(logout());

  return result;
};

// Create the API with the custom baseQuery
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponseType<UserResponseType[]>, void>({
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
    requestPasswordReset: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: 'request-password-reset/',
        method: 'POST',
        body,
      }),
    }),
    updatePassword: builder.mutation<
      void,
      { otp: string; newPassword: string }
    >({
      query: (body) => ({
        url: 'reset-password/',
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: 'register/',
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginMutation,
  useSignupMutation,
  useRequestPasswordResetMutation,
  useUpdatePasswordMutation,
} = api;

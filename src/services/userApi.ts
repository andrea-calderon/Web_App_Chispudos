import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponseType, UserResponseType } from '../types/api/apiResponses';
import baseQueryWithReauth from './baseQueryWithReauth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponseType<UserResponseType[]>, void>({
      query: () => 'users/',
    }),
    updateAvatar: builder.mutation<any, { userId: string; formData: FormData }>({
      query: ({ userId, formData }) => ({
        url: `/users/${userId}/avatar`,
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateAvatarMutation,
} = userApi;
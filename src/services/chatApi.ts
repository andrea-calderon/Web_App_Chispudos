import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getChatsByUserId: builder.query({
      query: (id) => `chat/conversations/user/${id}`,
    }),
    getChatById: builder.query({
      query: (id) => `chat/messages/${id}/`,
    }),
    createChat: builder.mutation({
      query: (chatData) => ({
        url: 'chats/',
        method: 'POST',
        body: chatData,
      }),
    }),
    updateChat: builder.mutation({
      query: ({ chatId, chatData }) => ({
        url: `chats/${chatId}`,
        method: 'PUT',
        body: chatData,
      }),
    }),
  }),
});

export const {
  useGetChatByIdQuery,
  useGetChatsByUserIdQuery,
  useCreateChatMutation,
  useUpdateChatMutation
} = chatApi;

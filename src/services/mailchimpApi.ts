import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mailchimpApi = createApi({
  reducerPath: 'mailchimpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://us21.api.mailchimp.com/3.0', // Reemplaza <dc> con tu datacenter (por ejemplo, us21)
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        'Basic anystring:9658e41f13688b8a76de09e48a769bd0-us21' // Reemplaza <YOUR_API_KEY> con tu API Key de Mailchimp
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation({
      query: (email: string) => ({
        url: `/lists/deb6a872e3/members`, // Reemplaza <list_id> con tu Audience ID
        method: 'POST',
        body: {
          email_address: email,
          status: 'subscribed',
        },
      }),
    }),
  }),
});

export const { useSubscribeToNewsletterMutation } = mailchimpApi;
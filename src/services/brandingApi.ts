import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponseType } from '../types/api/apiResponses';
import baseQueryWithReauth from './baseQueryWithReauth';
import { BrandingConfig } from '../types/branding';

export const brandingApi = createApi({
  reducerPath: 'brandingApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getBranding: builder.query<ApiResponseType<BrandingConfig>, void>({
      query: () => ({
        url: 'branding/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetBrandingQuery } = brandingApi;

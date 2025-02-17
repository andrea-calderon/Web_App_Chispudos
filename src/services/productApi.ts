import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductType } from '../services/productTypes';
import baseQueryWithReauth from './baseQueryWithReauth';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => 'public/products/',
    }),
    getProductById: builder.query<ProductType, string>({
      query: (id) => `/products/${id}/`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productApi;
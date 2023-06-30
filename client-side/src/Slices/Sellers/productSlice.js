import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sellersproductApi = createApi({
  reducerPath: 'sellersproductApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://us-central1-hydra-express.cloudfunctions.net/app/internal/user/products',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('hydra-express-access-token', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (id) => '',
    }),
  }),
});
console.log(sellersproductApi)

export const { useGetAllProductsQuery } = sellersproductApi;

export default sellersproductApi.reducerPath;

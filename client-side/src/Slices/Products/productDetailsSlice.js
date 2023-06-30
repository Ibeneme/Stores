
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://us-central1-hydra-express.cloudfunctions.net/app/home/product' }), 
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ user_unique_id, unique_id }) => ({
        url: '',
        method: 'POST',
        body: { user_unique_id, unique_id },
      }),
    }),
  }),
});

export const { useGetProductQuery } = api;
export default api;

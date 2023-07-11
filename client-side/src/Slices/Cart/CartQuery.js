import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CartsApi = createApi({
  reducerPath: "CartsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://us-central1-hydra-express.cloudfunctions.net/app/user/carts",
    prepareHeaders: (headers, { getState }) => {
        
        const token = getState().auth.token;
      if (token) {
        headers.set("hydra-express-access-token", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetAllCartsQuery } = CartsApi;


{
  console.log(useGetAllCartsQuery);
}

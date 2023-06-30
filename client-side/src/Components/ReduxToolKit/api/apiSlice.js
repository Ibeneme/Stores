// import { createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../Constant";

// const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})

// export const apiSlice = createApi({
//     reducerPath:'apiSlice',
//     baseQuery: fetchBaseQuery({
//         baseUrl:'https://us-central1-hydra-express.cloudfunctions.net/app/home/products/all'
//     }),
//     tagTypes: ['Post'],
//     endpoints:(builder) =>({})
// })


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// export const apiSlice = createApi({
//   reducerPath: 'apiSlice',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://us-central1-hydra-express.cloudfunctions.net/app',
//   }),
//   tagTypes: ['Post'],
//   endpoints: (builder) => ({
//     getPosts: builder.query({
//       query: () => '/posts',
//     }),
//   }),
// })
// export const { useGetPostsQuery } = apiSlice
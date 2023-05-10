import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://hydra-store.onrender.com'
    }), endpoints: (builder) =>({
        getAllProducts: builder.query({
            query: (id)=>"products",
        })
    })
})

export const { useGetAllProductsQuery } = productsApi
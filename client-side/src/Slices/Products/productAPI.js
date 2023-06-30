import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://us-central1-hydra-express.cloudfunctions.net/app/home/products/all'
    }), endpoints: (builder) =>({
        getAllProducts: builder.query({
            query: (id)=>"",
        })
    })
})

export const { useGetAllProductsQuery } = productsApi
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    items: [],
    status: null,
    error: null
}

export const productsFetch = createAsyncThunk(
    "products/productsFetch", 
    async(id = null, {rejectedWithvalue})=>{
        try{
            const response = await axios.get('http://localhost:5000/products')
        return response.data
        }
        catch(error){
            return rejectedWithvalue(error.response.data)
        }
       
    }
)

export const productSlice = createSlice({
    name:'products',
    initialState, 
    reducers: {
        [productsFetch.pending]:(state, action)=>{
            state.status = "pending"
        },

        [productsFetch.fulfilled]:(state, action)=>{
            state.status = "sucecss"
            state.items = action.payload
        },
        [productsFetch.rejected]:(state, action)=>{
            state.status = "rejected"
            state.error = action.payload
        },
    }
})

export default productSlice.reducer
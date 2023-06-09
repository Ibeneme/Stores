import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState ={
    items: [],
    status: null,
    error: null
}

export const fetchProductDetails = createAsyncThunk(
    "products/productsFetch", 
    async(unique_id = null, {rejectedWithvalue})=>{
        try{
            const response = await axios.get(`https://us-central1-hydra-express.cloudfunctions.net/app/home/products/all/${unique_id}`)
        return response.data
        }
        catch(error){
            return rejectedWithvalue(error.response.data)
        }
       
    }
)

const productsSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        [fetchProductDetails.pending]:(state, action)=>{
            state.status = "pending"
        },

        [fetchProductDetails.fulfilled]:(state, action)=>{
            state.status = "sucecss"
            state.items = action.payload
        },
        [fetchProductDetails.rejected]:(state, action)=>{
            state.status = "rejected"
            state.error = action.payload
        },
          },
        });
        
        export const { getProductStart, getProductSuccess, getProductFailure } = productsSlice.actions;
        
        export default productsSlice.reducer;

        
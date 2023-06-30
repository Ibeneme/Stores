import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: null,
    success: false,
  };
  export const updatePrices = createAsyncThunk(
    'editPrices/updatePrices',
    async ({ uniqueId, price, salesPrice }, { getState }) => {

        const token = getState().auth.token;
      try {
        const response = await axios.put(
          'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/edit/prices',
          {
            unique_id: uniqueId,
            price: price,
            sales_price: salesPrice,
          },
          {
            headers: {
                'hydra-express-access-token': token,
            },
          }
        );
  
        console.log(response)
        return response.data;
      } catch (error) {
        console.log(error)
        throw error.response.data;
      }
    }
  );
  const editPricesSlice = createSlice({
    name: 'editPrices',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(updatePrices.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(updatePrices.fulfilled, (state) => {
          state.loading = false;
          state.error = null;
          state.success = true;
        })
        .addCase(updatePrices.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || action.error;
          state.success = false;
        });
    },
  });
  

export default editPricesSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/image';

export const deleteProductImage = createAsyncThunk(
  'productImage/deleteProductImage',
  async (data, thunkAPI) => {
    try {
      const { uniqueId, productUniqueId } = data;
      const token = thunkAPI.getState().auth.token;

      const response = await axios.delete(API_URL, {
        headers: {
          'hydra-express-access-token': token,
        },
        data: {
          unique_id: uniqueId,
          product_unique_id: productUniqueId,
        },
      });
console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
      
    }
  }
);

const deleteImageSlice = createSlice({
  name: 'deleteImage',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProductImage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deleteProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : 'Error occurred while deleting product image.';
        state.success = false;
      });
  },
});

export default deleteImageSlice.reducer;

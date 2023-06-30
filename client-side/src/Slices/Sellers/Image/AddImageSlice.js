import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/image/add';

export const addProductImage = createAsyncThunk(
    'productImage/addProductImage',
    async (data, thunkAPI) => {
      try {
        const { productUniqueId, image } = data;
  
        const token = thunkAPI.getState().auth.token;
  
        const headers = {
            'hydra-express-access-token': token,
        };
  
        const response = await axios.post(API_URL, {
          product_unique_id: productUniqueId,
          image,
        }, { headers });
  
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
// Slice
const productImageSlice = createSlice({
  name: 'productImage',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProductImage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Error occurred while adding product image.';
        state.success = false;
      });
  },
});

export default productImageSlice.reducer;

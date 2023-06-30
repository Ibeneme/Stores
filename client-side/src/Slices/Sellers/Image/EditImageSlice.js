import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/image/edit';

// Async thunk to edit a product image
export const editProductImage = createAsyncThunk(
  'productImage/editProductImage',
  async (data, thunkAPI) => {
    try {
      const { uniqueId, productUniqueId, image } = data;
      const token = thunkAPI.getState().auth.token;

      const formData = new FormData();
      formData.append('unique_id', uniqueId);
      formData.append('product_unique_id', productUniqueId);
      formData.append('image', image);

      const response = await axios.put(API_URL, formData, {
        headers: {
            'hydra-express-access-token': token,
        },
      });

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
      .addCase(editProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editProductImage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Error occurred while editing product image.';
        state.success = false;
      });
  },
});

export default productImageSlice.reducer;

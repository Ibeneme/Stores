import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  loading: false,
  error: null,
};

// Create an async thunk to delete the product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',

  
  async (unique_id, {  getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.delete('https://us-central1-hydra-express.cloudfunctions.net/app/user/product', {
        headers: {
          'hydra-express-access-token': token,
        },
        data: { unique_id },
      });

      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const deleteProductSlice = createSlice({
  name: 'deleteProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.action = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the async thunk
export const { actions } = deleteProductSlice;

// Export the reducer
export default deleteProductSlice.reducer;

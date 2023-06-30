import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  publishing: false,
  error: null,
};

// Create an async thunk to publish the product
export const publishProduct = createAsyncThunk(
  'product/publishProduct',
  async (unique_id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const headers = {
        'hydra-express-access-token': token,
      };

      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/publish',
        {
          unique_id,
        },
        {
          headers,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const productPublishSlice = createSlice({
  name: 'productPublish',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(publishProduct.pending, (state) => {
        state.publishing = true;
        state.error = null;
      })
      .addCase(publishProduct.fulfilled, (state, action) => {
        state.publishing = false;
        state.action = action.payload;
      })
      .addCase(publishProduct.rejected, (state, action) => {
        state.publishing = false;
        state.error = action.payload;
      });
  },
});

// Export the async thunk
export const { actions } = productPublishSlice;

// Export the reducer
export default productPublishSlice.reducer;

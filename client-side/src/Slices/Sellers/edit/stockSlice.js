import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  success: false,
};

// Define the updateStock async thunk
export const updateStock = createAsyncThunk(
  'stock/updateStock',
  async ({ uniqueId, quantity, remaining }, { getState }) => {
    try {
        const token = getState().auth.token;
      const response = await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/edit/stock',
        { unique_id: uniqueId, quantity, remaining },
        { headers: {
            'hydra-express-access-token': token,
          }, }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create the stock slice
const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStock.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateStock.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export default stockSlice.reducer;

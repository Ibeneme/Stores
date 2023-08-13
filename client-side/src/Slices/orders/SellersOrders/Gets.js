// paidSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching paid orders
export const fetchPaidOrders = createAsyncThunk('orders/fetchPaidOrders', async () => {
  try {
    const response = await axios.get(
      'https://us-central1-hydra-express.cloudfunctions.net/app/user/orders/paid?paid=true'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Create the order slice
const paidSlice = createSlice({
  name: 'paid',
  initialState: {
    paidOrders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the fetchPaidOrders async thunk lifecycle
    builder
      .addCase(fetchPaidOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaidOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.paidOrders = action.payload;
      })
      .addCase(fetchPaidOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default paidSlice.reducer;

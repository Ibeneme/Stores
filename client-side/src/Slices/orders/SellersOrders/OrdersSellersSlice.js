// ordersInternalSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Make sure to install axios

// Create an async thunk to fetch ordersinternal
const fetchOrdersInternal = createAsyncThunk(
  'ordersInternal/fetchOrdersInternal',
  async (_, { getState }) => {
    try {
      const response = await axios.get(
        'https://us-central1-hydra-express.cloudfunctions.net/app/seller/orders',
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to mark an order as paid
const markOrderAsPaid = createAsyncThunk(
  'ordersInternal/markOrderAsPaid',
  async (orderUniqueId, { getState }) => {
    try {
      await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/seller/orders/paid?paid=true',
        { order_unique_id: orderUniqueId },
        {
          headers: {
            'hydra-express-access-key': 'your-access-key', // Replace with your access key
          },
        }
      );
      return orderUniqueId;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to mark an order as shipped
const markOrderAsShipped = createAsyncThunk(
  'ordersInternal/markOrderAsShipped',
  async (orderUniqueId, { getState }) => {
    try {
      await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/seller/order/shipped',
        { order_unique_id: orderUniqueId },
        {
          headers: {
            'hydra-express-access-key': 'your-access-key', // Replace with your access key
          },
        }
      );
      return orderUniqueId;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to mark an order as completed
const markOrderAsCompleted = createAsyncThunk(
  'ordersInternal/markOrderAsCompleted',
  async (orderUniqueId, { getState }) => {
    try {
      await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/seller/order/completed',
        { order_unique_id: orderUniqueId },
        {
          headers: {
            'hydra-express-access-key': 'your-access-key', // Replace with your access key
          },
        }
      );
      return orderUniqueId;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create the Redux slice for ordersinternal
const ordersInternalSlice = createSlice({
  name: 'ordersInternal',
  initialState: {
    ordersInternalData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersInternal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersInternal.fulfilled, (state, action) => {
        state.ordersInternalData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrdersInternal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(markOrderAsPaid.fulfilled, (state, action) => {
        // Update the order status in the state after it's marked as paid
        const orderUniqueId = action.payload;
        const index = state.ordersInternalData.findIndex((order) => order.order_unique_id === orderUniqueId);
        if (index !== -1) {
          state.ordersInternalData[index].paid = true;
        }
      })
      .addCase(markOrderAsShipped.fulfilled, (state, action) => {
        // Update the order status in the state after it's marked as shipped
        const orderUniqueId = action.payload;
        const index = state.ordersInternalData.findIndex((order) => order.order_unique_id === orderUniqueId);
        if (index !== -1) {
          state.ordersInternalData[index].shipped = true;
        }
      })
      .addCase(markOrderAsCompleted.fulfilled, (state, action) => {
        // Update the order status in the state after it's marked as completed
        const orderUniqueId = action.payload;
        const index = state.ordersInternalData.findIndex((order) => order.order_unique_id === orderUniqueId);
        if (index !== -1) {
          state.ordersInternalData[index].completed = true;
        }
      });
  },
});

export {
  fetchOrdersInternal,
  markOrderAsPaid,
  markOrderAsShipped,
  markOrderAsCompleted,
};

export default ordersInternalSlice.reducer;

// disputeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Make sure to install axios

// Create an async thunk to fetch all disputes
const fetchAllDisputes = createAsyncThunk(
  'dispute/fetchAllDisputes',
  async (_, { getState }) => {
    const { token } = getState().auth; // Assuming you have the auth slice with the token in the state
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      const response = await axios.get(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/disputes',
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to fetch disputes via order unique_id
const fetchDisputesByOrderUniqueId = createAsyncThunk(
  'dispute/fetchDisputesByOrderUniqueId',
  async (orderUniqueId, { getState }) => {
    const { token } = getState().auth; // Assuming you have the auth slice with the token in the state
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/dispute/via/order?order_unique_id=${orderUniqueId}`,
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to create a new dispute
const createNewDispute = createAsyncThunk(
  'dispute/createNewDispute',
  async (_, { getState }) => {
    const { token } = getState().auth; // Assuming you have the auth slice with the token in the state
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/dispute',
        {},
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create the Redux slice for disputes
const disputeSlice = createSlice({
  name: 'dispute',
  initialState: {
    disputes: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDisputes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDisputes.fulfilled, (state, action) => {
        state.disputes = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllDisputes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDisputesByOrderUniqueId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisputesByOrderUniqueId.fulfilled, (state, action) => {
        state.disputes = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDisputesByOrderUniqueId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewDispute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewDispute.fulfilled, (state, action) => {
        state.disputes.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createNewDispute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export {
  fetchAllDisputes,
  fetchDisputesByOrderUniqueId,
  createNewDispute,
};

export default disputeSlice.reducer;

// shippingSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Make sure to install axios

// Define the initial state for shipping


// Create an async thunk to fetch all shipping data
const fetchAllShippingData = createAsyncThunk(
  'shipping/fetchAllShippingData',
  async (_, { getState }) => {
    const { token } = getState().auth; // Assuming you have the auth slice with the token in the state
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      const response = await axios.get(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/all/shipping',
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to fetch shipping data by unique_id
const fetchShippingDataByUniqueId = createAsyncThunk(
  'shipping/fetchShippingDataByUniqueId',
  async (uniqueId, { getState }) => {
    const { token } = getState().auth; // Assuming you have the auth slice with the token in the state
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/shipping?unique_id=${uniqueId}`,
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to add a new shipping entry
const addNewShippingEntry = createAsyncThunk(
  'shipping/addNewShippingEntry',
  async (shippingData, { getState }) => {
    const { token } = getState().auth; // Assuming you have the auth slice with the token in the state
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/shipping/add',
        shippingData,
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to update the price of a shipping entry
const updateShippingPrice = createAsyncThunk(
  'shipping/updateShippingPrice',
  async ({ uniqueId, price }, { getState }) => {
    const { token } = getState().auth; // Assuming you have the auth slice with the token in the state
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      const response = await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/shipping/price',
        { unique_id: uniqueId, price },
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to update the locations of a shipping entry
const updateShippingLocations = createAsyncThunk(
  'shipping/updateShippingLocations',
  async ({ uniqueId, from_country, from_state, to_country, to_state }, { getState }) => {
    const { token } = getState().auth; // Assuming you have the auth slice with the token in the state
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      const response = await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/shipping/locations',
        { unique_id: uniqueId, from_country, from_state, to_country, to_state },
        config
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create an async thunk to delete a shipping entry
const deleteShippingEntry = createAsyncThunk(
  'shipping/deleteShippingEntry',
  async (uniqueId, { getState }) => {
    const { token } = getState().auth; // Assuming you have the auth slice with the token in the state
    const config = {
      headers: {
        'hydra-express-access-token': token,
      },
    };

    try {
      await axios.delete(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/shipping',
        {
          data: { unique_id: uniqueId },
          headers: {
            ...config.headers,
            'Content-Type': 'application/json',
          },
        }
      );
      return uniqueId; // Return the uniqueId so we can remove it from the state later
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Create the Redux slice
const shippingSlice = createSlice({
    name: 'shippingSlice',
    initialState: {
      shippingData: null,
      loading: false,
      error: null,
    },
    reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShippingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllShippingData.fulfilled, (state, action) => {
        state.shippingData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllShippingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchShippingDataByUniqueId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippingDataByUniqueId.fulfilled, (state, action) => {
        state.shippingData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchShippingDataByUniqueId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewShippingEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewShippingEntry.fulfilled, (state, action) => {
        state.shippingData.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addNewShippingEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateShippingPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShippingPrice.fulfilled, (state, action) => {
        const index = state.shippingData.findIndex((item) => item.unique_id === action.payload.unique_id);
        if (index !== -1) {
          state.shippingData[index].price = action.payload.price;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateShippingPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateShippingLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShippingLocations.fulfilled, (state, action) => {
        const index = state.shippingData.findIndex((item) => item.unique_id === action.payload.unique_id);
        if (index !== -1) {
          state.shippingData[index].from_country = action.payload.from_country;
          state.shippingData[index].from_state = action.payload.from_state;
          state.shippingData[index].to_country = action.payload.to_country;
          state.shippingData[index].to_state = action.payload.to_state;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateShippingLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteShippingEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShippingEntry.fulfilled, (state, action) => {
        state.shippingData = state.shippingData.filter((item) => item.unique_id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteShippingEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export {
  fetchAllShippingData,
  fetchShippingDataByUniqueId,
  addNewShippingEntry,
  updateShippingPrice,
  updateShippingLocations,
  deleteShippingEntry,
};

export default shippingSlice.reducer;

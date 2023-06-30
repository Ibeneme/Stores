// locationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  success: false,
};

// Create the asynchronous thunk for updating the location
export const updateLocation = createAsyncThunk(
  'location/updateLocation',
  async ({ uniqueId, location }, thunkAPI) => {
    try {
      // Get the token from the state
      const token = thunkAPI.getState().auth.token;

      // Set the request headers with the token
      const headers = {
        'hydra-express-access-token': token,
      };

      const response = await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/edit/location',
        {
          unique_id: uniqueId,
          location: location,
        },
        { headers } // Pass the headers in the request
      );
console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the location slice
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateLocation.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { actions: locationActions, reducer: locationReducer } = locationSlice;

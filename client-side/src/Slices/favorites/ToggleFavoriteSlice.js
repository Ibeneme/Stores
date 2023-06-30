// src/Slices/favorites/ToggleFavorite.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  loading: false,
  error: null,
};

// Create an async thunk to toggle favorite
export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async (product_unique_id, { rejectWithValue, getState }) => {
    try {
      // Get the access token from the state
      const token = getState().auth.token; // Assuming 'accessToken' is the property holding the token

      // Set the headers
      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.post(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/favorite/toggle?product_unique_id=${product_unique_id}`,
        {},
        { headers }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const toggleFavoriteSlice = createSlice({
  name: "toggleFavorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the async thunk and reducer

export default toggleFavoriteSlice.reducer;

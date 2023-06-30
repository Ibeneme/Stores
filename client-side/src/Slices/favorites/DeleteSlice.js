// src/Slices/favorites/DeleteFavorite.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  loading: false,
  error: null,
};

// Create an async thunk to delete a favorite
export const deleteFavorite = createAsyncThunk(
  "favorites/deleteFavorite",
  async (favorite_unique_id, { rejectWithValue, getState }) => {
    try {
      // Get the access token from the state
      const token = getState().auth.token; // Assuming 'accessToken' is the property holding the token

      // Set the headers
      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.delete(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/favorite?favorite_unique_id=${favorite_unique_id}`,
        { headers }
      );
      console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const deleteFavoriteSlice = createSlice({
  name: "deleteFavorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavorite.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the async thunk and reducer
export const { actions: deleteFavoriteActions } = deleteFavoriteSlice;
export default deleteFavoriteSlice.reducer;

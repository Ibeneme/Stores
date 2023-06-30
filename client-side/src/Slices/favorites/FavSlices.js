// src/Slices/favorites/Fav.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

// Create an async thunk to fetch favorites
export const fetchFavorites = createAsyncThunk(
    "favorites/fetchFavorites",
    async (_, { rejectWithValue, getState }) => {
      try {
        // Get the access token from the state
        const token = getState().auth.token; // Assuming 'accessToken' is the property holding the token
  
        // Set the headers
        const headers = {
          "hydra-express-access-token": token,
        };
  
        const response = await axios.get(
          "https://us-central1-hydra-express.cloudfunctions.net/app/user/favorites",
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
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default favoritesSlice.reducer;

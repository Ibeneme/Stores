import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  favorite: [],
  loading: false,
  error: null,
};

// Create an async thunk to fetch favorite
export const fetchFavorite = createAsyncThunk(
  "favorite/fetchFavorite",
  async (product_unique_id, { rejectWithValue, getState }) => {
    try {
      // Get the access token from the state
      const token = getState().auth.token; // Assuming 'accessToken' is the property holding the token

      // Set the headers
      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/favorite?product_unique_id=${product_unique_id}`,
        {
          headers,
        }
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
const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorite = action.payload;
      })
      .addCase(fetchFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default favoriteSlice.reducer;

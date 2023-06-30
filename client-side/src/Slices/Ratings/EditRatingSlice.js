// ratingsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "'https://us-central1-hydra-express.cloudfunctions.net/app/user/rating/edit'";

export const editProductRating = createAsyncThunk(
  "ratings/editProductRating",
  async (data, thunkAPI) => {
    try {
      const { productUniqueId, rating } = data;
      const token = thunkAPI.getState().auth.token;

      // Add the token as a header
      const headers = {
        "hydra-express-access-token": token,
      };

      const payload = {
        product_unique_id: productUniqueId,
        rating,
      };

      const response = await axios.post(API_URL, payload, { headers });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice
const editRatingsSlice = createSlice({
  name: "editratings",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProductRating.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editProductRating.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editProductRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : "Error occurred while editing product rating.";
        state.success = false;
      });
  },
});

export default editRatingsSlice.reducer;

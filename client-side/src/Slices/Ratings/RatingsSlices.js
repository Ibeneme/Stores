import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  rating: [],
  loading: false,
  error: null,
};

// Create an async thunk to fetch rating
export const fetchRating = createAsyncThunk(
  "rating/fetchRating",
  async (product_unique_id, {  getState, rejectWithValue }) => {
    try {

      const token = getState().auth.token;
  
        const headers = {
            "hydra-express-access-token": token,
          };

      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/rating?product_unique_id=${product_unique_id}`,
        {
          headers
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

// Create the rating slice
const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRating.fulfilled, (state, action) => {
        state.loading = false;
        state.rating = action.payload;

      })
      .addCase(fetchRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    
      });
  },
});

// Export the async thunk and reducer

export default ratingSlice.reducer;

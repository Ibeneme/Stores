import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRatings = createAsyncThunk(
    "ratings/fetchRatings",
    async (_, { rejectWithValue, getState }) => {
      try {
        // Get the access token from the state or any other necessary headers
        const token = getState().auth.token;
  
        // Set the headers
        const headers = {
            "hydra-express-access-token": token,
        };
  
        const response = await axios.get(
          "https://us-central1-hydra-express.cloudfunctions.net/app/user/ratings",
          { headers }
        );
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

// Define the initial state
const initialState = {
  ratings: [],
  loading: false,
  error: null,
};

// Create the slice
const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the async thunk and reducer

export default ratingsSlice.reducer;

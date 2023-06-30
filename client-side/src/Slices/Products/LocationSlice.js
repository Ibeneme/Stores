import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const locationFetch = createAsyncThunk(
  "locations/locationFetch",
  async ({ location_unique_id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/home/products/via/location?location=${location_unique_id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
      
    }
  }
);

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    // ...your other reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(locationFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(locationFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload.data; // Assuming the API response contains the data in the 'data' field
        state.error = null;
      })
      .addCase(locationFetch.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export default locationSlice.reducer;

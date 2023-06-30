import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://us-central1-hydra-express.cloudfunctions.net/app/user/product/edit/all";

// Async thunk to update all product details
export const updateAllProductDetails = createAsyncThunk(
  "editAll/updateAllProductDetails",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await axios.put(API_URL, data, {
        headers: {
          "hydra-express-access-token": token,
        },
      });
console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice
const editAllSlice = createSlice({
  name: "editAll",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAllProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAllProductDetails.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateAllProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : "Error occurred while updating product details.";
        state.success = false;
      });
  },
});

export default editAllSlice.reducer;

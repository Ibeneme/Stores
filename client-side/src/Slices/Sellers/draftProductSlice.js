import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  loading: false,
  error: null,
};

// Create an async thunk to send the product draft
export const sendProductDraft = createAsyncThunk(
  "product/sendProductDraft",
  async (draftData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/product/draft",
        draftData,
        { headers }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const draftproductSlice = createSlice({
  name: "draftProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendProductDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendProductDraft.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload

      })
      .addCase(sendProductDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the async thunk
export const { actions } = draftproductSlice;

// Export the reducer
export default draftproductSlice.reducer;

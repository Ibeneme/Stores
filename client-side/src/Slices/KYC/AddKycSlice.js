import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://us-central1-hydra-express.cloudfunctions.net/app/user/kyc/add";

// Async thunk to add KYC details
export const addKYCDetails = createAsyncThunk(
  "kyc/addKYCDetails",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      console.log(getState().auth);
      console.log(token);

      const headers = {
        "hydra-express-access-token": token,
      };
      const response = await axios.post(API_URL, payload, { headers });
console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const AddkycSlice = createSlice({
  name: "Addkyc",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addKYCDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addKYCDetails.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addKYCDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : "Error occurred while adding KYC details.";
        state.success = false;
      });
  },
});

export default AddkycSlice.reducer;

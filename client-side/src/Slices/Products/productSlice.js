

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async ({ user_unique_id, unique_id }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `https://us-central1-hydra-express.cloudfunctions.net/app/home/product?user_unique_id=${user_unique_id}&unique_id=${unique_id}`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
    }
  );
  

export const productSlice = createSlice({
  name: "productsDetails",
  initialState,
  reducers: {
    // ...your other reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

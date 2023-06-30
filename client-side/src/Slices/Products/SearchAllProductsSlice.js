
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const searchProducts = createAsyncThunk(
    "products/categoryFetch",
    async ({ searchForProduct }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
            `https://us-central1-hydra-express.cloudfunctions.net/app/home/search/products/all?search=${searchForProduct}`
            );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
    }
  );
  

export const searchProductSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // ...your other reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default searchProductSlice.reducer;
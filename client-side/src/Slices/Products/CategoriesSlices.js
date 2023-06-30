
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const categoryFetch = createAsyncThunk(
    "products/categoryFetch",
    async ({ category_unique_id}, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `https://us-central1-hydra-express.cloudfunctions.net/app/home/products/via/category?category_unique_id=${category_unique_id}`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
    }
  );
  

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // ...your other reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(categoryFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(categoryFetch.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
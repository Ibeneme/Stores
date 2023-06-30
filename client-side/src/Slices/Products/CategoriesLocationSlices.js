

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const CategoriesLocationsFetch = createAsyncThunk(
    "products/CategoriesLocations",
    async ({ category_unique_id, location_unique_id }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `https://us-central1-hydra-express.cloudfunctions.net/app/home/products/via/category/location?category_unique_id=${category_unique_id}&location=${location_unique_id}`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
    }
  );
  

export const categoriesLocationsFetchSlice = createSlice({
  name: "CategoriesLocations",
  initialState,
  reducers: {
    // ...your other reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(CategoriesLocationsFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(CategoriesLocationsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(CategoriesLocationsFetch.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default categoriesLocationsFetchSlice.reducer;

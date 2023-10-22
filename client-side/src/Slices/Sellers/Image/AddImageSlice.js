
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://us-central1-hydra-express.cloudfunctions.net/app/user/product/images/add";

export const addProductImage = createAsyncThunk(
  "productImage/addProductImage",
  async ({ unique_id, images }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.post(API_URL, { product_unique_id: unique_id, images }, { headers });
      return response.data;
    } catch (error) {
      console.log(error)
      throw error.response.data;
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
};

// Slice
const productImageSlice = createSlice({
  name: "productImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProductImage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Error occurred while adding a product image.";
        state.success = false;
      });
  },
});

export default productImageSlice.reducer;

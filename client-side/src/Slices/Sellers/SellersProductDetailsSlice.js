import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Create an async thunk to fetch the products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (unique_id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/internal/user/product?unique_id=${unique_id}`,
        {
          headers,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (_, { getState }) => {
    try {
      // Get the authentication token from the state
      const { token } = getState().auth;

      // Set the headers with the access token and hydra-express-access-key
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };

      // Make the API call with the headers
      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/internal/user/products",
        config
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

// Create the slice
const sellersProductsDetailsSlice = createSlice({
  name: "sellersProductsDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.data = action.payload; // Update the state with the fetched products data
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the async thunk
export const { actions } = sellersProductsDetailsSlice;

// Export the reducer
export default sellersProductsDetailsSlice.reducer;

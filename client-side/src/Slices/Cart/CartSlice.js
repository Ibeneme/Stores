// cartSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice with a token
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };
      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/carts",
        config
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      // Return the error message using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (itemData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice with a token
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };
      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/cart/add",
        itemData,
        config
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
        console.log(error);
      // Return the error message using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the cart slice
const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        // Handle the response after adding the item to the cart if needed
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartsSlice.reducer;

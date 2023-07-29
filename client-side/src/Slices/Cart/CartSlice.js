import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };
      const response = await axios.get(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/carts",
        config
      );
      localStorage.setItem("carts", JSON.stringify(response.data.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (itemData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
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

      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (cartItemData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };
      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/cart/quantity",
        cartItemData,
        config
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (unique_id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Assuming you have an auth slice with a token
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
        data: {
          unique_id: unique_id,
        },
      };
      const response = await axios.delete(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/cart",
        config
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const increaseCartItemQuantity = createAsyncThunk(
  "cart/increaseCartItemQuantity",
  async (unique_id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };
      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/cart/increase/quantity",
        { unique_id },
        config
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const decreaseCartItemQuantity = createAsyncThunk(
  "cart/decreaseCartItemQuantity",
  async (unique_id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };
      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/cart/decrease/quantity",
        { unique_id },
        config
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: {
          "hydra-express-access-token": token,
        },
      };
      const response = await axios.delete(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/clear/cart",
        config
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
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
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(increaseCartItemQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(increaseCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(increaseCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(decreaseCartItemQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(decreaseCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(decreaseCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartsSlice.reducer;

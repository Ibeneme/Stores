import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Create an async thunk to fetch the products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (unique_id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const headers = {
        'hydra-express-access-token': token,
      };

      const response = await axios.get(`https://us-central1-hydra-express.cloudfunctions.net/app/internal/user/product?unique_id=${unique_id}`, {
        headers,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const sellersProductsDetailsSlice = createSlice({
  name: 'sellersProductsDetails',
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
       
      });
  },
});

// Export the async thunk
export const { actions } = sellersProductsDetailsSlice;

// Export the reducer
export default sellersProductsDetailsSlice.reducer;

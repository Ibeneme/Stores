import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  loading: false,
  error: null,
};

// Create an async thunk to add a product
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (productData, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        console.log(token)
        const headers = {
          'hydra-express-access-token': token,
        };
      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/add',
        productData,
        {
          headers,
        }
      );
      console.log(response)
      return response.data;
    } catch (error) {
        console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const addproductSlice = createSlice({
  name: 'addproduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        {console.log(action.payload)}
      });
  },
});

// Export the async thunk
export const { actions } = addproductSlice;

// Export the reducer
export default addproductSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RiCreativeCommonsSaLine } from "react-icons/ri";

// Define the initial state
const initialState = {
  shippingPrice: null,
  loading: false,
  error: null,
};

// Define the asynchronous thunk for fetching the shipping price
export const fetchShippingPrice = createAsyncThunk(
  "shipping/fetchShippingPrice",
  async ({ fromAddress, toAddress }, { rejectWithValue, getState }) => {
    const token  = getState().auth.token; 

    try {
      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/shipping/price?from_address=${fromAddress}&to_address=${toAddress}`,
        {
          headers: {
            'hydra-express-access-token': token,
          },
        }
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the shipping slice
const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippingPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingPrice = action.payload;
      })
      .addCase(fetchShippingPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer from the shipping slice
export default shippingSlice.reducer;

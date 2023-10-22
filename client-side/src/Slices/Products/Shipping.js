// shippingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const addShipping = createAsyncThunk(
  "newShipping/add",
  async (requestData, { getState }) => {
    try {
      const token = getState().auth.token;
      console.log(token);
      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.post(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/shipping/add",
        requestData,
        {
          headers,
        }
      );
      console.log(response.data, "shippps");
      return response.data;
    } catch (error) {
      console.log(error, "shipppserrr");
      throw error;
    }
  }
);
export const getShipping = createAsyncThunk(
  "newShipping/get",
  async ({unique_id}, { getState }) => {
    try {
      const token = getState().auth.token;
      console.log(token);
      const headers = {
        "hydra-express-access-token": token,
      };

      const response = await axios.get(
        `https://us-central1-hydra-express.cloudfunctions.net/app/user/all/shipping/via/product?product_unique_id=${unique_id}`,
        {
          headers,
        }
      );
      console.log(response.data, "shippps");
      return response.data;
    } catch (error) {
      console.log(error, "shipppserrr");
      throw error;
    }
  }
);

const newShippingReducer = createSlice({
  name: "newShipping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addShipping.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addShipping.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addShipping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(getShipping.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getShipping.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(getShipping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export default newShippingReducer.reducer;

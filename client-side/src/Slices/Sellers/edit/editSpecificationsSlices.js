// specificationsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const updateSpecifications = createAsyncThunk(
  'specifications/update',
  async ({ uniqueId, specifications },{ getState } ) => {
    try {
        const token = getState().auth.token;
      const response = await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/edit/specifications',
        {
          unique_id: uniqueId,
          specifications: specifications,
        },
        {headers: {
            'hydra-express-access-token': token,
          }, }
      );

      console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      throw new Error('Failed to update specifications.');
    }
  }
);

const specificationsSlice = createSlice({
  name: 'specifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSpecifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSpecifications.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateSpecifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export default specificationsSlice.reducer;

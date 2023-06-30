import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action creator for updating the product name
export const updateProductName = createAsyncThunk(
  'editProduct/updateProductName',
  async ({ uniqueId, name }, { getState }) => {
    const token = getState().auth.token;

    try {
      const response = await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/edit/name',
        { unique_id: uniqueId, name },
        {
          headers: {
            'hydra-express-access-token': token,
          },
        }
      );
console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      throw error.response.data;
    }
  }
);

// Slice for editing the product name
const editProductSlice = createSlice({
  name: 'editProduct',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProductName.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProductName.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
       { console.log(action.payload)}
      })
      .addCase(updateProductName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

// Export the action creator and reducer
export const { actions: editProductActions, reducer: editProductReducer } = editProductSlice;



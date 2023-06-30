import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk function to update the product description
export const updateDescription = createAsyncThunk(
  'editDescription/updateDescription',
  async ({ uniqueId, description }, { getState }) => {
    try {
        const token = getState().auth.token;

      const response = await axios.put(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/product/edit/description',
        {
          unique_id: uniqueId,
          description: description,
        },
        { headers: {
            'hydra-express-access-token': token,
          }, }
      );
      console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      throw new Error('Error occurred while updating description.');
    }
  }
);

// Slice for editing the product description
const editDescriptionSlice = createSlice({
  name: 'editDescription',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDescription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDescription.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateDescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export default editDescriptionSlice.reducer;

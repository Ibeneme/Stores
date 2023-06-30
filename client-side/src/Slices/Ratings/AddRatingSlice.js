import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  loading: false,
  error: null,
};


export const addRating = createAsyncThunk(
  'ratings/addRating',
  async ({ productUniqueId, rating }, { rejectWithValue, getState }) => {
    try {
    
      const token = getState().auth.token 

      const headers = {
        'hydra-express-access-token': token,
      };

      const data = {
        product_unique_id: productUniqueId,
        rating,
      };

      const response = await axios.post(
        'https://us-central1-hydra-express.cloudfunctions.net/app/user/rating/add',
        data,
        { headers }
      );
      console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);


const addRatingSlice = createSlice({
  name: 'addrating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.loading = false;
        state.addratings = action.payload;
      })
      .addCase(addRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export default addRatingSlice.reducer;

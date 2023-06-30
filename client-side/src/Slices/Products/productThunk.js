// productThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getProductByIdStart,
  getProductByIdSuccess,
  getProductByIdFailure,
} from './pdSlice';

export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (id) => {
    try {
      const response = await axios.get(`https://us-central1-hydra-express.cloudfunctions.net/app/home/product?user_unique_id=${user_unique_id}&unique_id=${unique_id}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchProductById = (id) => async (dispatch) => {
  dispatch(getProductByIdStart());
  try {
    const response = await axios.get(`https://us-central1-hydra-express.cloudfunctions.net/app/home/product?user_unique_id=${user_unique_id}&unique_id=${unique_id}`);
    dispatch(getProductByIdSuccess(response.data));
  } catch (error) {
    dispatch(getProductByIdFailure(error.message));
  }
};

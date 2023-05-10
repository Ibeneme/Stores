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
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchProductById = (id) => async (dispatch) => {
  dispatch(getProductByIdStart());
  try {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    dispatch(getProductByIdSuccess(response.data));
  } catch (error) {
    dispatch(getProductByIdFailure(error.message));
  }
};

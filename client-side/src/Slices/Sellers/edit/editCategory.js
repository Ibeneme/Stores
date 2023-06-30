import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCategory = createAsyncThunk(
  "editCategory/updateCategory",
  async ({ uniqueId, categoryUniqueId }, { getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.put(
        "https://us-central1-hydra-express.cloudfunctions.net/app/user/product/edit/category",
        {
          unique_id: uniqueId,
          category_unique_id: categoryUniqueId,
        },
        {
          headers: {
            "hydra-express-access-token": token,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

const editCategorySlice = createSlice({
  name: "editCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update category";
      });
  },
});

export const { actions: editCategoryActions, reducer: editCategoryReducer } =
  editCategorySlice;

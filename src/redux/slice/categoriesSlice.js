import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://task-ecommerce-api.vercel.app/api/categories"
      );
     console.log("Response from categories API:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return rejectWithValue("dsasd");
    }
  }
);
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// export { getAllCategories };
export default categoriesSlice.reducer;

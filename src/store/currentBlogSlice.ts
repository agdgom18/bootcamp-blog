import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  loading: true,
  blog: {},
  similarBlogs: [],
  error: '',
};

// Generates pending , fulfilled and rejected action types
export const fetchBlog = createAsyncThunk('currentBlog', async (id) => {
  const res = await axios.get(`https://api.blog.redberryinternship.ge/api/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  const result = res.data;
  return result;
});

const currentBlogSlice = createSlice({
  name: 'currentBlog',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBlog.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blog = action.payload;
      state.error = '';
    });
    builder.addCase(fetchBlog.rejected, (state, action) => {
      state.loading = false;
      state.blog = {};
      state.error = action.error.message;
    });
  },
});

export default currentBlogSlice.reducer;

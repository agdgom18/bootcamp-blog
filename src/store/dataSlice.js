import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  loading: true,
  data: [],
  error: '',
};

// Generates pending , fulfilled and rejected action types
export const fetchData = createAsyncThunk('blogs', async () => {
  const res = await axios.get('https://api.blog.redberryinternship.ge/api/blogs', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });

  const result = res.data.data.filter((el) => new Date(el.publish_date).getTime() <= new Date().getTime());
  return result;
});

const dataSlice = createSlice({
  name: 'blogs',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default dataSlice.reducer;

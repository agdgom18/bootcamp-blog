import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const savedFilters = Cookies.get('filters');

const initialState = {
  loading: true,
  data: [],
  error: '',
  filterBlogArr: [],
  filterArr: savedFilters ? JSON.parse(savedFilters) : [],
};

// helper function
const filterDataByFilterArr = (arr, filterArr) => {
  if (filterArr.length === 0) {
    return arr;
  }
  return arr.filter((item) => filterArr.some((filter) => item.categories.some(({ title }) => title === filter)));
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

export const filterData = (filterValue) => ({
  type: 'FILTER_BLOGS',
  payload: filterValue,
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
      const sortedDataByDate = action.payload.slice().sort((a, b) => {
        const dateA = new Date(a.publish_date);
        const dateB = new Date(b.publish_date);
        return dateB - dateA;
      });
      state.data = sortedDataByDate;
      if (savedFilters) {
        state.filterBlogArr = filterDataByFilterArr(sortedDataByDate, JSON.parse(savedFilters));
      } else {
        state.filterBlogArr = sortedDataByDate;
      }

      state.error = '';
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase('FILTER_BLOGS', (state, action) => {
      const filter = action.payload;
      let newFilterArr = [];
      state.filterArr.includes(filter)
        ? (newFilterArr = state.filterArr.filter((el) => el !== filter))
        : (newFilterArr = [...state.filterArr, filter]);

      state.filterArr = [...newFilterArr];
      state.filterBlogArr = filterDataByFilterArr(state.data, newFilterArr);
    });
  },
});

export default dataSlice.reducer;

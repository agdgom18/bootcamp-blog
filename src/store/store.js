import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import categoriesSlice from './categoriesSlice';
import currentBlogSlice from './currentBlogSlice';

export const store = configureStore({
  reducer: {
    dataSlice,
    categoriesSlice,
    currentBlogSlice,
  },
});

import { configureStore } from '@reduxjs/toolkit';
// import subscribe from './subsSlice/subscribeSlice';
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

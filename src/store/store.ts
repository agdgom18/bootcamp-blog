import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './categoriesSlice'
import currentBlogSlice from './currentBlogSlice'
import dataSlice from './dataSlice'

export const store = configureStore({
	reducer: {
		dataSlice,
		categoriesSlice,
		currentBlogSlice,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category } from 'Card'
import axios from 'axios'

type CategoriesState = {
	loading: boolean
	categories: {
		value: string
		label: string
		color: string
		textColor: string
	}[]
	error?: string
}

const initialState: CategoriesState = {
	loading: true,
	categories: [],
	error: '',
}

// Generates pending , fulfilled and rejected action types
export const fetchCategories = createAsyncThunk('categories', async () => {
	const res = await axios.get(
		'https://api.blog.redberryinternship.ge/api/categories',
		{
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
			},
		}
	)
	const result: Category[] = res.data.data
	return result.map(el => {
		return {
			value: el.id,
			label: el.title,
			color: el.background_color,
			textColor: el.text_color,
		}
	})
})

const categoriesSlice = createSlice({
	name: 'categories',
	reducers: {},
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchCategories.pending, state => {
			state.loading = true
		})

		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.loading = false
			state.categories = action.payload
			state.error = ''
		})
		builder.addCase(fetchCategories.rejected, (state, action) => {
			state.loading = false
			state.categories = []
			state.error = action.error.message
		})
	},
})

export default categoriesSlice.reducer

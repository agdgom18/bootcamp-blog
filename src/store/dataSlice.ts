import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const savedFilters = Cookies.get('filters')

interface Blog {
	categories: { title: string }[]
}

type State = {
	loading: boolean
	data: []
	error?: string
	filterBlogArr: []
	filterArr: []
}

const initialState: State = {
	loading: true,
	data: [],
	error: '',
	filterBlogArr: [],
	filterArr: savedFilters ? JSON.parse(savedFilters) : [],
}

// helper function
const filterDataByFilterArr = (arr: Blog[], filterArr: string[]): Blog[] => {
	if (filterArr.length === 0) {
		return arr
	}

	return arr.filter(item =>
		filterArr.some(filter =>
			item.categories.some(({ title }) => title === filter)
		)
	)
}

// Generates pending , fulfilled and rejected action types
export const fetchData = createAsyncThunk('blogs', async () => {
	const res = await axios.get(
		'https://api.blog.redberryinternship.ge/api/blogs',
		{
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
			},
		}
	)

	const result = res.data.data.filter(
		// @ts-ignore
		el => new Date(el.publish_date).getTime() <= new Date().getTime()
	)
	return result
})
// @ts-ignore
export const filterData = filterValue => ({
	type: 'FILTER_BLOGS',
	payload: filterValue,
})

const dataSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchData.pending, state => {
			state.loading = true
		})

		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.loading = false
			// @ts-ignore
			const sortedDataByDate = action.payload.slice().sort((a, b) => {
				const dateA = new Date(a.publish_date)
				const dateB = new Date(b.publish_date)
				// @ts-ignore
				return dateB - dateA
			})
			state.data = sortedDataByDate
			if (savedFilters) {
				// @ts-ignore
				state.filterBlogArr = filterDataByFilterArr(
					sortedDataByDate,
					JSON.parse(savedFilters)
				)
			} else {
				state.filterBlogArr = sortedDataByDate
			}

			state.error = ''
		})
		builder.addCase(fetchData.rejected, (state, action) => {
			state.loading = false
			state.data = []
			state.error = action.error.message
		})
		builder.addCase('FILTER_BLOGS', (state, action) => {
			// @ts-ignore
			const filter = action.payload
			let newFilterArr = []
			// @ts-ignore
			state.filterArr.includes(filter)
				? (newFilterArr = state.filterArr.filter((el: any) => el !== filter))
				: (newFilterArr = [...state.filterArr, filter])
			// @ts-ignore
			state.filterArr = [...newFilterArr]
			// @ts-ignore
			state.filterBlogArr = filterDataByFilterArr(state.data, newFilterArr)
		})
	},
})

export default dataSlice.reducer

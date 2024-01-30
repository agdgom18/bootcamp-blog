import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../store/categoriesSlice'
import styles from './filters.module.scss'
// @ts-ignore
const Filters = ({ filterby, filterArr }) => {
	// @ts-ignore
	const { loading, categories } = useSelector(state => state.categoriesSlice)
	const dispatch = useDispatch()

	React.useEffect(() => {
		// @ts-ignore
		dispatch(fetchCategories())
	}, [])
	// @ts-ignore
	if (loading) {
		return <div>Loading...</div>
	}
	return (
		<section className={styles.filters}>
			<div className={styles.filetersContainer}>
				<ul className={styles.filterList}>
					{categories.map(
						// @ts-ignore
						({ value, color, label, textColor }) => {
							return (
								<li key={value} className={styles.filterListItem}>
									<button
										onClick={() => filterby(label)}
										className={styles.button}
										style={{
											backgroundColor: color,
											color: textColor,
											border: `2px solid ${
												filterArr.includes(label) ? '#000' : 'transparent'
											}`,
										}}
									>
										{label}
									</button>
								</li>
							)
						}
					)}
				</ul>
			</div>
		</section>
	)
}

export default Filters

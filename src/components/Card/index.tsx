import React from 'react'
import { Link } from 'react-router-dom'
import { CardProps, Category } from '../../types/Card'
import styles from './card.module.scss'

const Card: React.FC<CardProps> = ({
	title,
	description,
	image,
	author,
	publish_date,
	categories,
	id,
}) => {
	return (
		<div className={styles.card}>
			<img className={styles.img} src={image} alt='card-photo' />
			<div className={styles.author}>
				<h4>{author}</h4>
				<p>{publish_date}</p>
			</div>
			<h3 className={styles.title}>{title}</h3>
			<ul className={styles.filters}>
				{categories?.map(
					({ id, title, text_color, background_color }: Category) => {
						return (
							<li
								style={{ color: text_color, backgroundColor: background_color }}
								key={id}
							>
								{title}
							</li>
						)
					}
				)}
			</ul>
			<p className={styles.description}>{description}</p>
			<Link to={`/post/${id}`} className={`${styles.link}`}>
				<span className='link-text'>სრულად ნახვა</span>
				<svg
					width='20'
					height='20'
					viewBox='0 0 20 20'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M5.93415 13.0052C5.64125 13.2981 5.64125 13.773 5.93415 14.0659C6.22704 14.3587 6.70191 14.3587 6.99481 14.0659L5.93415 13.0052ZM14.2855 6.46446C14.2855 6.05024 13.9498 5.71445 13.5355 5.71446L6.78555 5.71445C6.37133 5.71445 6.03555 6.05024 6.03555 6.46445C6.03555 6.87867 6.37133 7.21445 6.78555 7.21445H12.7855V13.2145C12.7855 13.6287 13.1213 13.9645 13.5355 13.9645C13.9498 13.9645 14.2855 13.6287 14.2855 13.2145L14.2855 6.46446ZM6.99481 14.0659L14.0659 6.99478L13.0052 5.93412L5.93415 13.0052L6.99481 14.0659Z'
						fill='#5D37F3'
					/>
				</svg>
			</Link>
		</div>
	)
}

export default Card

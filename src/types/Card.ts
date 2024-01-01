export type CardProps = {
	title: string
	description: string
	image: string
	author: string
	publish_date: string
	categories: []
	id: string
}

export type Category = {
	id: string
	title: string
	text_color: string
	background_color: string
}

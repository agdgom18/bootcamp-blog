import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Context } from '../../App'
import infoCircle from '../../img/info-circle.svg'
import logo from '../../img/logo.svg'
import succsessCircle from '../../img/succsess-circle.svg'
import Modal from '../Modal'
import styles from './header.module.scss'
const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	// @ts-ignore
	const changeModalStatus = status => {
		document.body.style.overflowY = status ? 'hidden' : 'scroll'
		setIsOpen(status)
	}
	//Context for validation
	// @ts-ignore
	const [signedIn, setSignedIn] = useContext(Context)
	// FORM
	const form = useForm()
	const { register, handleSubmit, formState, reset } = form
	const [serverError, setServerError] = React.useState(null)
	const { errors } = formState
	useEffect(() => {
		Cookies.set('signedIn', JSON.stringify(signedIn))
	}, [signedIn])

	const onSubmitHandler = async ({ email }) => {
		try {
			const apiUrl = 'https://api.blog.redberryinternship.ge/api/login'
			const postData = {
				email: email,
			}
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
					'Content-Type': 'application/json',
				},
			}
			//  POST
			const response = await axios.post(apiUrl, postData, axiosConfig)
			setSignedIn(true)
			reset()
		} catch (error) {
			// @ts-ignore
			setServerError('მომხმარებელი არ მოიძებნა')
		}
	}
	return (
		<header className={styles.header}>
			<img src={logo} alt='logo'></img>
			{!signedIn ? (
				<button onClick={changeModalStatus} className={styles.button}>
					შესვლა
				</button>
			) : (
				<Link to={'./add'} className={styles.linkToAddBlog}>
					დაამატე ბლოგი
				</Link>
			)}

			<Modal isOpen={isOpen} onClose={() => changeModalStatus(false)}>
				{signedIn ? (
					<div className={styles.succsessBLock}>
						<img
							className={styles.succsessCircle}
							src={succsessCircle}
							alt='ok'
						/>
						<h3 className={styles.title}>წარმატებული ავტორიზაცია</h3>
					</div>
				) : (
					<div>
						<h3 className={styles.title}>შესვლა</h3>

						<form
							onSubmit={
								// @ts-ignore
								handleSubmit(onSubmitHandler)
							}
							className={styles.form}
						>
							<div className={styles.formControl}>
								<label htmlFor='email'>ელ-ფოსტა:</label>
								<input
									className={styles.input}
									style={{ border: errors?.email ? '1px solid red' : '' }}
									type='email'
									id='email'
									placeholder='Example@redberry.ge'
									{...register('email', {
										pattern: {
											value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
											message: 'Invlaid email',
										},
										required: {
											value: true,
											message: 'Enter correct email',
										},
										validate: {
											emailEnd: fieldValue => {
												return (
													fieldValue.endsWith('@redberry.ge') ||
													'ელ-ფოსტა არ მოიძებნა'
												)
											},
										},
									})}
								/>
								{errors?.email && (
									<div className={styles.errorText}>
										<img src={infoCircle} alt='info' />

										<p>{errors.email?.message}</p>
									</div>
								)}
								{!errors?.email && serverError && (
									<div className={styles.errorText}>
										<img src={infoCircle} alt='info' />
										<p>{serverError}</p>
									</div>
								)}
							</div>
							<button className={styles.submitBtn}> შესვლა</button>
						</form>
					</div>
				)}
			</Modal>
		</header>
	)
}

export default Header

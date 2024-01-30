import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from '../App'
const PrivateRoutes = () => {
	const [signedIn] = useContext(Context)
	return signedIn ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoutes

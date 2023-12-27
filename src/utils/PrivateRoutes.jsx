import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App';
const PrivateRoutes = () => {
  const [signedIn] = useContext(Context);
  return signedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

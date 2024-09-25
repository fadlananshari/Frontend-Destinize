import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoutes;
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;

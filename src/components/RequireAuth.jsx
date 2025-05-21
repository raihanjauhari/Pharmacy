// components/RequireAuth.jsx
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const role = localStorage.getItem("role");

  // Kalau belum login
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // Kalau role tidak sesuai
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Kalau role sesuai
  return <Outlet />;
};

export default RequireAuth;

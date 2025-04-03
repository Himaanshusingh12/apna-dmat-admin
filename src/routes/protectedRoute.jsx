import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("adminToken");

  // console.log("Checking authentication in ProtectedRoute:", token);

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

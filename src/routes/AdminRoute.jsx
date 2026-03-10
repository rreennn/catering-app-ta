import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function AdminRoute({ children }) {
  const { auth } = useAuth();

  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  if (auth.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;

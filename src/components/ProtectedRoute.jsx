import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // TODO:
  // Replace this with real authentication check
  // once backend authentication is connected.

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
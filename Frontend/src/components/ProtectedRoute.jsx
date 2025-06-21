import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ allowedRoles }) {
  const { usuario } = useAuthStore();

  if (!usuario) {
    // If user is not logged in, redirect to home page
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(usuario.tipo)) {
    // If user role is not allowed, show an unauthorized message or redirect
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Acceso Denegado</h1>
        <p>No tienes permiso para ver esta página.</p>
      </div>
    );
  }

  // If user is authenticated and has the correct role, render the content
  return <Outlet />;
}

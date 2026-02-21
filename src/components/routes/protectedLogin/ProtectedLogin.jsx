import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { warningNotification } from "../../utils/notifications/Notifications";
import useAuth from "../../../hooks/useAuth";

const ProtectedLogin = () => {
  const { isAuth, isTokenExpired, logout } = useAuth();

  const shouldLogout = !isAuth || isTokenExpired();

  useEffect(() => {
    if (shouldLogout) {
      warningNotification(
        "Debes iniciar sesión para acceder a esta sección."
      );
      logout("/login");
    }
  }, [shouldLogout]);

  if (shouldLogout) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLogin;
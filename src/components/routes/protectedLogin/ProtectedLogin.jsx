import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { warningNotification } from "../../utils/notifications/Notifications";

const ProtectedLogin = () => {
  const { isAuth, isTokenExpired, logout } = useAuth();

  if (!isAuth || isTokenExpired()) {
    warningNotification(
      "Debes iniciar sesión para acceder a esta sección. Por favor, inicia sesión."
    );
    logout(false);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLogin;
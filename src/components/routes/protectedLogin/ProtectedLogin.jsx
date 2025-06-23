import { Outlet, Navigate } from "react-router-dom";
import { warningNotification } from "../../utils/notifications/Notifications";
import useAuth from "../../../hooks/useAuth";


const ProtectedLogin = () => {
  const { isAuth, isTokenExpired } = useAuth();
  
  if (!isAuth || isTokenExpired()) {
    warningNotification(
      "Debes iniciar sesión para acceder a esta sección. Por favor, inicia sesión."
    );
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLogin;
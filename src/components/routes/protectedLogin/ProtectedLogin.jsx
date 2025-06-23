import { Outlet, Navigate } from "react-router-dom";
import { warningNotification } from "../../utils/notifications/Notifications";
import useAuth from "../../../hooks/useAuth";
import { ListGroup } from "react-bootstrap";


const ProtectedLogin = () => {
  const { isAuth, isTokenExpired , logout } = useAuth();
  
  if (!isAuth || isTokenExpired()) {
    warningNotification(
      "Debes iniciar sesión para acceder a esta sección. Por favor, inicia sesión."
    );
    logout();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLogin;
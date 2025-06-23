import { useContext } from "react";
import {jwtDecode} from "jwt-decode";
import AuthContext from "../contexts/auth/Auth.Context";


const useAuth = () => {
  const context = useContext(AuthContext);

  const { token, isAuth, userData, login, logout } = context;

  const hasRole = (role) => {
    if (!userData?.role) return false;
    return userData.role === role;
  };

  const isTokenExpired = () => {
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      return decoded.exp < currentTime; 
    } catch (err) {
      console.error("Error al decodificar el token:", err);
      return true; 
    }
  };

  return {
    isAuth,
    userData,
    role: userData?.role || null,
    hasRole,
    isTokenExpired,
    login,
    logout,
  };
};

export default useAuth;

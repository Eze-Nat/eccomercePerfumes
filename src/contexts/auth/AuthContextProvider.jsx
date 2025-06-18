import { useState, useEffect } from "react";
import AuthContext from "./Auth.Context";
import {
  getToken,
  isAuthenticated,
  saveToken,
  logout as logoutHelper,
} from "../../helpers/auth.helpers";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [role, setRole] = useState(() => {
    const token = getToken();
    if (token && token.split(".").length === 3) {
      try {
        const decoded = jwtDecode(token);
        return decoded?.role || null;
      } catch (error) {
        console.error("Token inválido al inicializar:", error.message);
      }
    } else {
      console.warn("Token inválido o mal formado:", token);
    }
    return null;
  });

  const login = (newToken) => {
    if (newToken && newToken.split(".").length === 3) {
      try {
        const decoded = jwtDecode(newToken);
        saveToken(newToken);
        setToken(newToken);
        setIsAuth(true);
        setRole(decoded?.role || null);
      } catch (error) {
        console.error(
          "Error al decodificar token durante login:",
          error.message
        );
      }
    } else {
      console.warn("Token recibido en login no es válido:", newToken);
    }
  };

  const logout = (redirectUrl = "/login") => {
    logoutHelper(redirectUrl);
    setToken(null);
    setIsAuth(false);
    setRole(null);
  };

  useEffect(() => {
    const syncAuth = () => {
      setToken(getToken());
      setIsAuth(isAuthenticated());
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuth, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

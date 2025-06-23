import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "./Auth.Context";
import {
  getToken,
  isAuthenticated,
  saveToken,
  logout as logoutHelper,
} from "../../helpers/auth.helpers";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [user, setUser] = useState(() => {
    const storedToken = getToken();
    if (storedToken) {
      try {
        return jwtDecode(storedToken);
      } catch (err) {
        console.error("Error al decodificar el token inicial:", err.message);
      }
    }
    return null;
  });

  const login = (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      saveToken(newToken);
      setToken(newToken);
      setIsAuth(true);
      setUser(decoded);
    } catch (err) {
      console.error("Login fallido, token inválido:", err.message);
    }
  };

  const logout = (redirectUrl = "/login") => {
    logoutHelper(redirectUrl);
    setToken(null);
    setIsAuth(false);
    setUser(null);
  };

  useEffect(() => {
    const syncAuth = () => {
      const currentToken = getToken();
      setToken(currentToken);
      setIsAuth(isAuthenticated());
      try {
        setUser(currentToken ? jwtDecode(currentToken) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuth,
        userData: user,
        role: user?.role || null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

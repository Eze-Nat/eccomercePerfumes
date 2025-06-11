import { useState, useEffect } from "react";
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

  const login = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
    setIsAuth(true);
  };

  const logout = (redirectUrl = "/login") => {
    logoutHelper(redirectUrl);
    setToken(null);
    setIsAuth(false);
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
    <AuthContext.Provider value={{ token, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

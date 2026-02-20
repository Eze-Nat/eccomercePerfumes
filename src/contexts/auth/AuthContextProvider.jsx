import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "./Auth.Context";
import {
  getToken,
  isAuthenticated,
  saveToken,
  removeToken,
  logout as logoutHelper,
} from "../../helpers/auth.helpers";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [userData, setUserData] = useState(() => {
    const storedToken = getToken();
    if (storedToken) {
      try {
        return jwtDecode(storedToken);
      } catch (err) {
        console.error("Token inválido al iniciar:", err);
        removeToken();
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
      setUserData(decoded);
    } catch (err) {
      console.error("Token inválido al hacer login:", err);
      removeToken();
      setToken(null);
      setIsAuth(false);
      setUserData(null);
    }
  };

  const logout = (redirectUrl = "/login") => {
    logoutHelper(redirectUrl);
    setToken(null);
    setIsAuth(false);
    setUserData(null);
  };

  useEffect(() => {
    const syncAuth = () => {
      const currentToken = getToken();
      setToken(currentToken);
      setIsAuth(isAuthenticated());

      if (currentToken) {
        try {
          setUserData(jwtDecode(currentToken));
        } catch {
          setUserData(null);
          removeToken();
        }
      } else {
        setUserData(null);
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
        userData,
        setUserData,
        role: userData?.role || null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

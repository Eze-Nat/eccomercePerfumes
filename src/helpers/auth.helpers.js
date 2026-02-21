import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    removeToken();
    return false;
  }
};

export const logout = (redirectUrl = "/login") => {
  removeToken();
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
};

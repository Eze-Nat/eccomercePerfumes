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
  return !!token;
};

export const logout = (redirectUrl = "/login") => {
  removeToken();
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
};

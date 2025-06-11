export const getToken = () => localStorage.getItem("token");

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const isAuthenticated = () => !!getToken();

export const logout = (redirectUrl = "/login") => {
  localStorage.removeItem("token");
  window.location.href = redirectUrl;
};

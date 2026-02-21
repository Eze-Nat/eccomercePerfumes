export const customFetch = async (
  url,
  fetch_method = "GET",
  req_body = null,
  onSuccess = () => {},
  onError = () => {},
  skipAuth = false
) => {
  try {
    const baseUrl =
      import.meta.env.VITE_BASE_SERVER_URL || "http://localhost:3000";

    const fullUrl = `${baseUrl}/api${url.startsWith("/") ? "" : "/"}${url}`;

    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      ...(token && !skipAuth && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(fullUrl, {
      method: fetch_method,
      headers,
      body:
        fetch_method !== "GET" && req_body
          ? JSON.stringify(req_body)
          : undefined,
    });

if (!response.ok) {
  if (response.status === 401) {
    onError(new Error("Credenciales incorrectas."));
    return null;
  }

  if (response.status === 403) {
    onError(new Error("No tienes permisos para esta acción."));
    return null;
  }

  if (response.status >= 500) {
    onError(new Error("Error del servidor. Intenta más tarde."));
    return null;
  }

  onError(new Error("Error en la solicitud."));
  return null;
}

    const data = await response.json();
    onSuccess(data);
    return data;

  } catch (error) {
    console.error("Error en customFetch:", error.message);
    onError(error);
    return null; // ❗️ NO throw
  }
};
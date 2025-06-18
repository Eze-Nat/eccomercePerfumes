export const customFetch = async (
  url,
  fetch_method = "GET",
  req_body = null,
  onSuccess = () => {},
  onError = () => {},
  skipAuth = false
) => {
  try {
    const fullUrl = `${
      import.meta.env.VITE_BASE_SERVER_URL || "http://localhost:3000"
    }/${url.replace(/^\//, "")}`;

    const token = localStorage.getItem("token");
    console.log("Token obtenido en customFetch:", token); // linea para retirar

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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Error en la solicitud");
    }

    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};

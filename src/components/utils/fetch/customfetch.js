export const customFetch = async (
  url,
  fetch_method = "GET",
  req_body = null,
  onSuccess = () => {},
  onError = () => {},
  skipAuth = false
) => {
  
  try {
   // 1. Construcción correcta de la URL
    const baseUrl = import.meta.env.VITE_BASE_SERVER_URL || "http://localhost:3000";
    const fullUrl = `${baseUrl}/api${url.startsWith("/") ? "" : "/"}${url}`;

    const token = localStorage.getItem("token");
    console.log("Token obtenido en customFetch:", token); // linea para retirar

    const headers = {
      "Content-Type": "application/json",
      ...(token && !skipAuth && { Authorization: `Bearer ${token}` }),
    };

    console.log("Fetch completo a:", fullUrl, "con headers:", headers);

    const response = await fetch(fullUrl, {
      method: fetch_method,
      headers,
      body:
        fetch_method !== "GET" && req_body
          ? JSON.stringify(req_body)
          : undefined,
    });



if (!response.ok) {
  const errorData = await response.json(); 
  throw new Error(errorData.error || errorData.message || `Error ${response.status}`);
}

    const data = await response.json();
    onSuccess(data);
    return data;

  } catch (error) {
    console.error("Error en customFetch:", error.message);
    onError(error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
  }
};

export const customFetch = async (
  url,
  fetch_method,
  req_body,
  onSuccess,
  onError
) => {
  try {
    
    const fullUrl = `${import.meta.env.VITE_BASE_SERVER_URL || 'http://localhost:3000'}/${url.replace(/^\//, '')}`;
    
    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: fetch_method, 
      body: req_body ? JSON.stringify(req_body) : undefined, 
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message ?? "Hubo un error inesperado");
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};
export const getImageUrl = (path) => {
  const baseUrl = import.meta.env.VITE_BASE_SERVER_URL || "http://localhost:3000";

  if (!path) return "/placeholder-image.png";

  return path.startsWith("http")
    ? path
    : `${baseUrl}${path}`;
};
// src/services/api.js
export const updatePerfumeInJson = async (updatedPerfume) => {
  // En desarrollo: guarda en localStorage
  const perfumes = JSON.parse(localStorage.getItem('perfumes') || []);
  const updated = perfumes.map(p => p.id === updatedPerfume.id ? updatedPerfume : p);
  localStorage.setItem('perfumes', JSON.stringify(updated));
  
  /* En producción sería:
  const response = await fetch('/api/perfumes', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPerfume)
  });
  return await response.json();
  */
};
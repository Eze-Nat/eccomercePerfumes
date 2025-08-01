
export const updatePerfumeInJson = async (updatedPerfume) => {

  const perfumes = JSON.parse(localStorage.getItem('perfumes') || []);
  const updated = perfumes.map(p => p.id === updatedPerfume.id ? updatedPerfume : p);
  localStorage.setItem('perfumes', JSON.stringify(updated));
  
};
// utils/mappers.js

export const mapBackendToFrontend = (p) => ({
  id: p.id,
  titulo: p.name,
  descripcion: p.description,
  imagen: p.mainImage,
  precio: parseFloat(p.price) || 0,
  stock: parseInt(p.stock) || 0,
  brand: p.brand,
  category: p.category,
  active: p.active ?? true,
});

export const mapFrontendToBackend = (p) => ({
  id: p.id,
  name: p.titulo,
  description: p.descripcion,
  mainImage: p.imagen,
  price: p.precio,
  stock: p.stock,
  brand: p.brand,
  category: p.category,
  active: p.active,
});

import { useState, useEffect } from "react";
import { Perfumes } from "../perfumes/Perfumes.jsx";
import Navbar from "./navbar/Navbar.jsx";
import { customFetch } from "../utils/fetch/customfetch.js";


const Home = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [searchPerfume, setSearchPerfume] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchPerfumes = async () => {
    try {
const data = await customFetch("/products");

const mappedProducts = data.map((item) => ({
  id: item.id,
  titulo: item.name,
  descripcion: item.description,
  imagen: item.mainImage,
  precio: item.price,
  stock: item.stock,
  brand: item.brand,
  category: item.category,
  active: item.active,
}));

setPerfumes(mappedProducts);
    } catch (err) {
      console.error("Error fetching products from API:", err);
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  fetchPerfumes();
}, []);


  if (loading) return <div>Cargando perfumes...</div>;
  {error && (
  <div className="demo-warning">
    🔧 Modo demo: productos cargados desde archivo local
  </div>
)}


  const updateProductInBackend = async (product) => {
    try {
      const payload = {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        mainImage: product.mainImage,
        active: product.active,
      };

      const response = await customFetch(
        `/products/${product.id}`,
        "PUT",
        payload
      );

      // Mapeo de la respuesta del backend al formato esperado por el frontend
      const backendData = {
        id: response.id,
        titulo: response.name,
        descripcion: response.description,
        imagen: response.mainImage,
        precio: response.price,
        stock: response.stock,
        brand: response.brand,
        category: response.category,
        active: response.active,
      };

      setPerfumes((prev) =>
        prev.map((p) => (p.id === backendData.id ? backendData : p))
      );

      return response;
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  };

  return (
    <>
      <Navbar onSearchPerfume={setSearchPerfume} />
      <Perfumes
        perfumes={perfumes}
        searchPerfume={searchPerfume}
        onUpdatePerfume={updateProductInBackend}
      />
    </>
  );
};

export default Home;

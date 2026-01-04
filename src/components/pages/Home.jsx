import { useState, useEffect } from "react";
import { Perfumes } from "../perfumes/Perfumes.jsx";
import Navbar from "./navbar/Navbar.jsx";
import { customFetch } from "../utils/fetch/customfetch.js";
import productsData from "../../productList.json";

const Home = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [searchPerfume, setSearchPerfume] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  try {
    const mappedProducts = productsData.Search.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      descripcion: item.descripcion,
      imagen: item.imagen,
      precio: item.precio || "Consultar",
      stock: item.stock || "Disponible",
    }));

    setPerfumes(mappedProducts);
  } catch (err) {
    console.error("Error cargando productos:", err);
    setError("No se pudieron cargar los productos");
  } finally {
    setLoading(false);
  }
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

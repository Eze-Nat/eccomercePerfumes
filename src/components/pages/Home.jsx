import { useState, useEffect } from "react";
import { Perfumes } from "../perfumes/perfumes.jsx";
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
        const data = await customFetch("/products", "GET", null, undefined, undefined, true);

        const backendData = data.map((item) => ({
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

        setPerfumes(backendData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfumes();
  }, []);

  if (loading) return <div>Cargando perfumes...</div>;
  if (error) return <div>Error: {error}</div>;

  const updateProductInBackend = async (product) => {
    try {
      // Mapeo para enviar solo las keys que espera el backend
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

      console.log("Payload a enviar al backend:", payload);

      const response = await customFetch(
        `/products/${product.id}`,
        "PUT",
        payload
      );

      console.log("Respuesta del backend:", response);

      // Mapear respuesta para actualizar estado local con los nombres correctos
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

      // Actualizo estado local
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

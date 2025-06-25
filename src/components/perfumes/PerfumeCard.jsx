import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AdminControls from "../admin/AdminControls";
import { useCart } from "../../contexts/cart/CartContextProvider";
import { successNotification, errorNotification } from "../utils/notifications/Notifications";
import Loader from "../utils/spinner/Loader";

import { mapBackendToFrontend, mapFrontendToBackend } from "../utils/mapperDB/mappers";


const PerfumeCard = ({ perfume = {}, onUpdateProduct, isAdmin = false }) => {
  

  
const [currentPerfume, setCurrentPerfume] = useState(mapBackendToFrontend(perfume));

  useEffect(() => {
    setCurrentPerfume(mapBackendToFrontend(perfume));
  }, [perfume]);


const [showAdminControls, setShowAdminControls] = useState(false);
if (!isAdmin && !perfume.active) return null;

const handleFieldChange = (field, value) => {
  setCurrentPerfume((prev) => ({
    ...prev,
    [field]: field === "price" || field === "stock" ? parseFloat(value) || 0 : value,
  }));
};

const handleSaveChanges = async () => {
    try {
      const updatedData = mapFrontendToBackend(currentPerfume);

      console.log("Datos a actualizar:", updatedData);

      await onUpdateProduct(updatedData);
      setShowAdminControls(false);
      successNotification("Producto actualizado con éxito");
    } catch (error) {
      errorNotification("Error al actualizar: " + error.message);
    }
  };

  const disabled = !perfume.active && isAdmin;
  const { addToCart } = useCart();


  return (
        <article
      className="perfume-card"
      style={{ opacity: (!perfume.active & isAdmin) ? 0.5 : 1 }}
    >
      <div className="text-center">
        <h3>{perfume.titulo}</h3>
        <span className="price">
          <h6>{perfume.brand}</h6>
          <p>{perfume.descripcion}</p>
        </span>
      </div>

      <div className="perfume-image-container">
  <Loader
    src={perfume.imagen?.startsWith("http") ? perfume.imagen : `http://localhost:3000${perfume.imagen}`}
    alt={perfume.titulo}
    placeholder="/placeholder-image.png" 
  />
      </div>

      <div className="m-2">${perfume.precio?.toFixed(2) || "Consultar precio"}</div>

      <Button variant="outline-warning" className="btn-perfume m-2" onClick={() => !disabled && addToCart(perfume)} disabled={disabled}>
        Agregar al carrito
      </Button>


    </article>
  );
};

export default PerfumeCard;

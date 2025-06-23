import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AdminControls from "../admin/AdminControls";
import { useCart } from "../../contexts/cart/CartContextProvider";
import { successNotification, errorNotification } from "../utils/notifications/Notifications";
import Loader from "../utils/spinner/Loader";
import useAuth from "../../hooks/useAuth"
const PerfumeCard = ({ perfume = {}, isAdmin = false, onUpdateProduct }) => {
  
  const { hasRole } = useAuth();
  
  const [currentPerfume, setCurrentPerfume] = useState({
    id: perfume.id || "",
    name: perfume.titulo || "",
    description: perfume.descripcion || "",
    mainImage: perfume.imagen || "",
    price: parseFloat(perfume.precio) || 0,
    stock: parseInt(perfume.stock) || 0,
    brand: perfume.brand || "",
    category: perfume.category || "",
    active: perfume.active ?? true,
  });

    useEffect(() => {
    setCurrentPerfume({
      id: perfume.id || "",
      name: perfume.titulo || "",
      description: perfume.descripcion || "",
      mainImage: perfume.imagen || "",
      price: parseFloat(perfume.precio) || 0,
      stock: parseInt(perfume.stock) || 0,
      brand: perfume.brand || "",
      category: perfume.category || "",
      active: perfume.active ?? true,
    });
  }, [perfume]);

  const [showAdminControls, setShowAdminControls] = useState(false);

const handleFieldChange = (field, value) => {
  setCurrentPerfume((prev) => ({
    ...prev,
    [field]: field === "price" || field === "stock" ? parseFloat(value) || 0 : value,
  }));
};

const handleSaveChanges = async () => {
  try {
    // Ajustar claves para el backend
const updatedData = {
  id: currentPerfume.id,
  name: currentPerfume.name,
  description: currentPerfume.description,
  mainImage: currentPerfume.mainImage,
  price: currentPerfume.price,
  stock: currentPerfume.stock,
  brand: currentPerfume.brand,
  category: currentPerfume.category,
  active: currentPerfume.active,
};

    console.log("Datos a actualizar:", updatedData);

    await onUpdateProduct(updatedData);
    setShowAdminControls(false);
    successNotification("Producto actualizado con éxito");
  } catch (error) {
    errorNotification("Error al actualizar: " + error.message);
  }
};

  const { addToCart } = useCart();

  return (
    <article className="perfume-card">
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

      <Button variant="outline-warning" className="btn-perfume m-2" onClick={() => addToCart(perfume)}>
        Agregar al carrito
      </Button>

      {hasRole("admin","superadmin") && (
        <>
          <Button
            variant="outline-danger"
            className="btn-perfume m-2"
            onClick={() => setShowAdminControls(!showAdminControls)}
          >
            {showAdminControls ? "Ocultar controles" : "Modificar producto"}
          </Button>
          {showAdminControls && (
            <AdminControls
              perfume={currentPerfume}
              onFieldChange={handleFieldChange}
              onSave={handleSaveChanges}
            />
          )}
        </>
      )}
    </article>
  );
};

export default PerfumeCard;

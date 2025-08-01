import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import { useCart } from "../../contexts/cart/CartContextProvider";
import { successNotification } from "../utils/notifications/Notifications";
import Loader from "../utils/spinner/Loader";
import { mapBackendToFrontend } from "../utils/mapperDB/mappers";

const PerfumeCard = ({ initialPerfume = {}, isAdmin = false }) => {
  
  const [perfume, setPerfume] = useState(initialPerfume);
  const [currentPerfume, setCurrentPerfume] = useState(mapBackendToFrontend(perfume));
  const [showStockModal, setShowStockModal] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    setCurrentPerfume(mapBackendToFrontend(perfume));
  }, [perfume]);

  const handleAddToCart = () => {
    if (perfume.stock <= 0) {
      setShowStockModal(true);
      return;
    }
    addToCart(perfume);
    setPerfume((prev) => ({
      ...prev,
      stock: prev.stock - 1,
    }))  
    successNotification("Producto agregado al carrito");
  };

  if (!isAdmin && !perfume.active) return null;

  const disabled = !perfume.active && isAdmin;

  return (
    <article 
      className="perfume-card position-relative" 
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      {perfume.stock <= 0 && (
        <div className="position-absolute top-0 start-0 m-2">
          <span className="badge bg-danger">Agotado</span>
        </div>
      )}

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

      <div className="m-2">
        ${perfume.precio?.toFixed(2) || "Consultar precio"}
        {perfume.stock > 0 && (
          <small className="d-block text-white">{perfume.stock} disponibles</small>
        )}
      </div>

      <Button 
        variant={perfume.stock <= 0 ? "outline-secondary" : "outline-warning"} 
        className="btn-perfume m-2" 
        onClick={handleAddToCart} 
        disabled={disabled || perfume.stock <= 0}
      >
        {perfume.stock <= 0 ? "Sin stock" : "Agregar al carrito"}
      </Button>

      <Modal show={showStockModal} onHide={() => setShowStockModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Producto no disponible</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lo sentimos, <strong>{perfume.titulo}</strong> está actualmente agotado.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStockModal(false)}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>
    </article>
  );
};

export default PerfumeCard;
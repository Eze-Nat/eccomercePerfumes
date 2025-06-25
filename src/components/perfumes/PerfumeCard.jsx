import { useState } from "react";
import { Button, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useCart } from "../../contexts/cart/CartContextProvider";
import { successNotification } from "../utils/notifications/Notifications";
import Loader from "../utils/spinner/Loader";

const PerfumeCard = ({ initialPerfume = {}, isAdmin = false }) => {
  const [perfume, setPerfume] = useState(initialPerfume);
  const [showStockModal, setShowStockModal] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (perfume.stock <= 0) {
      setShowStockModal(true);
      return;
    }
    addToCart(perfume);
    setPerfume((prev) => ({ ...prev, stock: prev.stock - 1 }));
    successNotification("Producto agregado al carrito");
  };

  if (!isAdmin && !perfume.active) return null;

  const disabled = !perfume.active && isAdmin;


  const titleTooltip = (props) => (
    <Tooltip id="title-tooltip" {...props}>
      {perfume.titulo}
    </Tooltip>
  );


  const descTooltip = (props) => (
    <Tooltip id="desc-tooltip" {...props}>
      {perfume.descripcion}
    </Tooltip>
  );

  return (
    <article 
      className="perfume-card d-flex flex-column h-100 position-relative mx-2 my-3"
      style={{ 
        opacity: disabled ? 0.5 : 1,
        minHeight: '450px',
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        transition: 'all 0.3s ease'
      }}
    >

      {perfume.stock <= 0 && (
        <div className="position-absolute top-0 start-0 m-2">
          <span className="badge bg-danger">Agotado</span>
        </div>
      )}


      <div className="text-center px-3 pt-3 flex-grow-0">
        <OverlayTrigger placement="top" overlay={titleTooltip}>
          <h5 
            className="mb-2 text-truncate"
            style={{ cursor: 'help' }}
          >
            {perfume.titulo}
          </h5>
        </OverlayTrigger>
        
        <h6 className="mb-2 text-white">{perfume.brand}</h6>
        
        <OverlayTrigger placement="bottom" overlay={descTooltip}>
          <p 
            className="small text-white mb-3 text-truncate" 
            style={{
              maxHeight: '3em',
              cursor: 'help'
            }}
          >
            {perfume.descripcion}
          </p>
        </OverlayTrigger>
      </div>


      <div 
        className="perfume-image-container flex-grow-1 d-flex align-items-center justify-content-center px-3"
        style={{ 
          minHeight: '200px',
          maxHeight: '220px'
        }}
      >
        <Loader
          src={perfume.imagen?.startsWith("http") ? perfume.imagen : `http://localhost:3000${perfume.imagen}`}
          alt={perfume.titulo}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease'
          }}
          placeholder="/placeholder-image.jpg" 
        />
      </div>


      <div className="mt-auto px-3 pb-3">
        <div className="mb-2 text-center">
          <h5 className="mb-0">${perfume.precio?.toFixed(2) || "Consultar precio"}</h5>
          {perfume.stock > 0 && (
            <small className="text-success">{perfume.stock} disponibles</small>
          )}
        </div>

        <Button 
          variant={perfume.stock <= 0 ? "outline-secondary" : "outline-warning"} 
          className="w-100" 
          onClick={handleAddToCart} 
          disabled={disabled || perfume.stock <= 0}
        >
          {perfume.stock <= 0 ? "Sin stock" : "Agregar al carrito"}
        </Button>
      </div>


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
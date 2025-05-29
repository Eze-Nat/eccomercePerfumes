import { useState } from "react";
import { Button } from "react-bootstrap";
import AdminControls from "../admin/AdminControls";

const PerfumeCard = ({ perfume = {}, isAdmin = false, onUpdateProduct }) => {
  // Estados para el producto
  const [currentPerfume, setCurrentPerfume] = useState({
    id: perfume.id || '',
    nombre: perfume.nombre || '',
    titulo: perfume.titulo || '',
    descripcion: perfume.descripcion || '',
    imagen: perfume.imagen || '',
    precio: parseFloat(perfume.precio) || 0,
    stock: parseInt(perfume.stock) || 0,
    isHidden: Boolean(perfume.isHidden)
  });

  
  // Estado para mostrar/ocultar controles
  const [showAdminControls, setShowAdminControls] = useState(false);

   const handleFieldChange = (field, value) => {
    setCurrentPerfume(prev => ({
      ...prev,
      [field]: field === 'precio' ? parseFloat(value) || 0 : 
               field === 'stock' ? parseInt(value) || 0 :
               value
    }));
  };

  
  // Handler para guardar cambios
  const handleSaveChanges = () => {
    // Actualiza el JSON a través de la función prop
    if (onUpdateProduct) {
      onUpdateProduct(currentPerfume);
    }
    setShowAdminControls(false);
  };




  return (
    <article 
      className="perfume-card" 
      style={{
        background: "transparent",
        opacity: currentPerfume.isHidden ? 0.5 : 1,
        border: currentPerfume.isHidden ? "1px dashed #ccc" : "none",
        transition: 'all 0.3s ease'
      }}
    > 
      <div className="perfume-header">
        <h3>{currentPerfume.nombre}</h3>
        <span className="price">
          <h6>{currentPerfume.titulo}</h6>
          <p>{currentPerfume.descripcion}</p>
        </span>
      </div>

      <div className="perfume-image-container d-flex justify-content-center align-items-center"> 
        <img src={currentPerfume.imagen} alt={currentPerfume.nombre} />
      </div>

      <div className="m-2">
        {!currentPerfume.precio || isNaN(Number(currentPerfume.precio)) 
          ? "Consultar Precio" 
          : `$${Number(currentPerfume.precio).toFixed(2)}`
        }
      </div>

      <Button variant="outline-warning" className="btn-perfume m-2"> 
        Agregar Al Carrito
      </Button>

      {isAdmin && (
        <>
          <Button 
            variant="outline-danger" 
            className="btn-perfume m-2"
            onClick={() => setShowAdminControls(!showAdminControls)}
          >
            {showAdminControls ? 'Ocultar controles' : 'Modificar producto'}
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
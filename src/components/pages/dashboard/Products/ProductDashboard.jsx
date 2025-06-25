import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import ProductListItem from "./ProductListItems";
import ProductForm from "./ProductForm";
import { customFetch } from "../../../utils/fetch/customfetch";
import { mapBackendToFrontend } from "../../../utils/mapperDB/mappers";
import useAuth from "../../../../hooks/useAuth";

const ProductsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { hasRole } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async () => {
  try {
    const data = await customFetch("/products", "GET", null, undefined, undefined, true);
    // Ordena por ID descendente (los más nuevos primero)
    const sortedProducts = data
      .map(mapBackendToFrontend)
      .sort((a, b) => b.id - a.id);
    
    setProducts(sortedProducts);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};


  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await customFetch(`/products/${id}`, "DELETE");
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };


  const handleFormSuccess = () => {
    fetchProducts();
    setShowForm(false);
  };

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Productos</h4>
        <Button onClick={() => { setEditProduct(null); setShowForm(true); }}>
          + Agregar nuevo
        </Button>
      </div>

{products

  .map((perfume) => (
    <ProductListItem
      key={perfume.id}
      perfume={perfume}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
))}

      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            initialData={editProduct}
            onSuccess={handleFormSuccess}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};


export default ProductsDashboard;

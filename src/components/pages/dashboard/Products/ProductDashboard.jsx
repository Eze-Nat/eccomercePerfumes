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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { hasRole } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await customFetch("/products", "GET", null, undefined, undefined, true);
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

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await customFetch(`/products/${productToDelete.id}`, "DELETE");
      fetchProducts();
      setShowDeleteModal(false);
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

      {products.map((perfume) => (
        <ProductListItem
          key={perfume.id}
          perfume={perfume}
          onEdit={handleEdit}
          onDelete={() => confirmDelete(perfume)} 
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar el producto <strong>{productToDelete?.nombre}</strong>?
          <p className="text-danger mt-2">Esta acción no se puede deshacer.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsDashboard;
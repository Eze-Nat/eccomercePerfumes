import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { customFetch } from "../../../utils/fetch/customFetch";
import { mapFrontendToBackend } from "../../../utils/mapperDB/mappers";

const ProductForm = ({ initialData = {}, onSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    precio: 0,
    stock: 0,
    brand: "",
    category: "",
    active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = initialData?.id ? "PUT" : "POST";
    const url = initialData?.id ? `/products/${initialData.id}` : "/products";

    try {
      await customFetch(url, method, mapFrontendToBackend(formData));
      onSuccess();
    } catch (error) {
      console.error("Error guardando producto:", error);

    }
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ruta de imagen</Form.Label>
        <Form.Control
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          placeholder="/lattafa/ejemplo.jpg"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Marca</Form.Label>
        <Form.Control
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Categoría</Form.Label>
        <Form.Control
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          label={formData.active ? "Visible" : "Oculto"}
          name="active"
          checked={formData.active}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        {initialData?.id ? "Guardar cambios" : "Crear producto"}
      </Button>
    </Form>
  );
};

export default ProductForm;

import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { customFetch } from "../utils/fetch/customfetch";
import { successNotification, errorNotification } from "../utils/notifications/Notifications";

const initialState = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  brand: "",
  category: "",
  mainImage: "", // Ruta tipo: "/lattafa/lattafa_yara_pink_edp_100ml.jpg"
  active: true,
};

const PerfumeForm = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await customFetch("/products", "POST", form);

      successNotification("Producto creado correctamente");
      setForm(initialState);
    } catch (err) {
      errorNotification("Error al crear el producto: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3 className="mb-3">Agregar nuevo producto</h3>

      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </Form.Group>

      <InputGroup className="mb-3">
        <InputGroup.Text>Precio $</InputGroup.Text>
        <Form.Control
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          type="number"
          min="0"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => handleChange("stock", parseInt(e.target.value) || 0)}
        />
        <InputGroup.Text>unidades</InputGroup.Text>
      </InputGroup>

      <Form.Group className="mb-3">
        <Form.Label>Marca (brand)</Form.Label>
        <Form.Control
          type="text"
          value={form.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Categoría</Form.Label>
        <Form.Control
          type="text"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ruta de la imagen</Form.Label>
        <Form.Control
          type="text"
          value={form.mainImage}
          placeholder="/lattafa/lattafa_yara_pink_edp_100ml.jpg"
          onChange={(e) => handleChange("mainImage", e.target.value)}
        />
      </Form.Group>

      <Form.Check
        type="switch"
        id="activeSwitch"
        label={form.active ? "Activo" : "Inactivo"}
        checked={form.active}
        onChange={(e) => handleChange("active", e.target.checked)}
        className="mb-3"
      />

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Creando..." : "Agregar producto"}
      </Button>
    </Form>
  );
};

export default PerfumeForm;

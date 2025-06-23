import { Form, InputGroup, Button } from "react-bootstrap";


const AdminControls = ({ perfume, onFieldChange, onSave }) => {

  const handleSave = () => {
    onSave();

  };

  return (
    <div className="admin-controls mt-3 p-2 border rounded">
      <Form.Group className="mb-3">
        <Form.Check 
          type="switch"
          label={perfume.active ? "Producto visible" : "Producto oculto"}
          checked={perfume.active}
          onChange={(e) => onFieldChange("active", e.target.checked)}
        />
      </Form.Group>

      <InputGroup className="mb-3">
        <Form.Control
          type="number"
          min="0"
          value={perfume.stock || ""}
          onChange={(e) => onFieldChange("stock", parseInt(e.target.value) || 0)}
          placeholder="Stock"
        />
        <InputGroup.Text>unidades</InputGroup.Text>
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          type="number"
          min="0"
          step="0.01"
          value={perfume.price || ""}
          onChange={(e) => onFieldChange("price", parseFloat(e.target.value) || 0)}
          placeholder="Precio"
        />
      </InputGroup>

      <Form.Group className="mb-3">
  <Form.Label>Título</Form.Label>
  <Form.Control
    type="text"
    value={perfume.name}
    onChange={(e) => onFieldChange("name", e.target.value)}
    placeholder="Título del perfume"
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Descripción</Form.Label>
  <Form.Control
    as="textarea"
    rows={3}
    value={perfume.description}
    onChange={(e) => onFieldChange("description", e.target.value)}
    placeholder="Descripción del perfume"
  />
</Form.Group>

<InputGroup className="mb-3">
  <InputGroup.Text>📸</InputGroup.Text>
  <Form.Control
    type="text"
    value={perfume.mainImage || ""}
    onChange={(e) => onFieldChange("mainImage", e.target.value)}
    placeholder="/lattafa/lattafa_yara_pink_edp_100ml.jpg"
  />
</InputGroup>

      <Button variant="success" onClick={handleSave}>
        Guardar cambios
      </Button>
    </div>
  );
};

export default AdminControls;

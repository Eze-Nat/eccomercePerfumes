import { Form, InputGroup, Button } from "react-bootstrap";

const AdminControls = ({ perfume, onFieldChange, onSave }) => {
  return (
    <div className="admin-controls mt-3 p-2 border rounded">
      <Form.Group className="mb-3">
        <Form.Check 
          type="switch"
          label={perfume.isHidden ? "Producto oculto" : "Producto visible"}
          checked={!perfume.isHidden}
          onChange={(e) => onFieldChange("isHidden", !e.target.checked)}
        />
      </Form.Group>

      <InputGroup className="mb-3">
        <Form.Control
          type="number"
          min="0"
          value={perfume.stock || ""}  // Cambio clave aquí
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
          value={perfume.precio || ""}  // Cambio asi no aparece 0
          onChange={(e) => onFieldChange("precio", e.target.value)}
          placeholder="Precio"
        />
      </InputGroup>

      <Button variant="success" onClick={onSave}>
        Guardar cambios
      </Button>
    </div>
  );
};

export default AdminControls;
import { Form, InputGroup, Button } from "react-bootstrap";
import { successNotification } from "../utils/notifications/Notifications";

const AdminControls = ({ perfume, onFieldChange, onSave }) => {

  const handleSave = () => {
    onSave();
    successNotification("Cambios guardados correctamente");
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

      <Button variant="success" onClick={handleSave}>
        Guardar cambios
      </Button>
    </div>
  );
};

export default AdminControls;

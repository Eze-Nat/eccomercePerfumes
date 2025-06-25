import { Badge, Button, Row, Col } from "react-bootstrap";

const ProductListItem = ({ perfume, onEdit, onDelete }) => {
  return (
    <Row className="align-items-center border p-2 mb-2 rounded">
      <Col xs={2}>
        <img
          src={
            perfume.imagen?.startsWith("http")
              ? perfume.imagen
              : `http://localhost:3000${perfume.imagen}`
          }
          alt={perfume.titulo}
          style={{ width: "100%", maxHeight: "80px", objectFit: "cover" }}
        />
      </Col>

      <Col xs={6}>
        <strong>{perfume.titulo}</strong>
        <div className="text-white">{perfume.brand}</div>
        <div className="text-white">${perfume.precio}</div>
      </Col>

      <Col xs={2}>
        <Badge bg={perfume.active ? "success" : "secondary"}>
          {perfume.active ? "Activo" : "Oculto"}
        </Badge>
      </Col>

      <Col xs={2} className="text-end">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onEdit(perfume)}
        >
          Editar
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          className="ms-2"
          onClick={() => onDelete(perfume.id)}
        >
          Eliminar
        </Button>
      </Col>
    </Row>
  );
};

export default ProductListItem;

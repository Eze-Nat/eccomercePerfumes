import { Modal, Button, ListGroup, Badge, Row, Col } from "react-bootstrap";

const AdminOrderDetailModal = ({ show, onHide, order }) => {
  if (!order) return null;

  const user = order.User || {};

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Orden #{order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <p>
              <strong>Usuario:</strong> {user.first_name} {user.last_name}{" "}
              <br />
              <strong>Email:</strong> {user.email || "No disponible"}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
              <br />
              <strong>Estado:</strong>{" "}
              <Badge
                bg={
                  order.status === "pending"
                    ? "warning"
                    : order.status === "processing"
                    ? "info"
                    : order.status === "shipped"
                    ? "primary"
                    : order.status === "completed"
                    ? "success"
                    : order.status === "canceled"
                    ? "danger"
                    : "secondary"
                }
              >
                {order.status}
              </Badge>
              <br />
              <strong>Método de Pago:</strong> {order.paymentMethod}
            </p>
          </Col>
        </Row>

        <p>
          <strong>Dirección de Envío:</strong>
          <br />
          {order.shippingAddress}
        </p>

        <hr />

        <h5>Productos</h5>
        <ListGroup variant="flush">
          {order.items && order.items.length > 0 ? (
            order.items.map(({ quantity, unitPrice, Product }) => (
              <ListGroup.Item key={Product.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{Product.name}</strong>
                    <div className="text-muted">
                      {quantity} x ${unitPrice.toFixed(2)}
                    </div>
                  </div>
                  <div>${(unitPrice * quantity).toFixed(2)}</div>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <p>No hay productos en esta orden.</p>
          )}
        </ListGroup>

        <h5 className="mt-3 text-end">Total: ${order.total.toFixed(2)}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminOrderDetailModal;

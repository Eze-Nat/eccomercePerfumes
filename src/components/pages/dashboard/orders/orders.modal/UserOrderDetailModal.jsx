import { Modal, Button, ListGroup, Badge } from "react-bootstrap";

const UserOrderDetailModal = ({ show, onHide, order }) => {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de la Orden #{order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Fecha de compra:</strong>{" "}
          {new Date(order.orderDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Total:</strong> ${order.total}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          <Badge bg="success">{order.status || "Pagado"}</Badge>
        </p>

        <hr />
        <h5>Productos</h5>
        <ListGroup variant="flush">
          {order.items.map((item, idx) => (
            <ListGroup.Item key={idx}>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>{item.Product.name}</strong>
                  <div className="text-muted">
                    {item.quantity} x ${item.Product.price}
                  </div>
                </div>
                <div>${item.quantity * item.Product.price}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserOrderDetailModal;

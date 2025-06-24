import { Modal, Button, ListGroup, Badge } from "react-bootstrap";

const AdminOrderDetailModal = ({ show, onHide, order }) => {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Orden #{order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Usuario ID:</strong> {order.user_id}
        </p>
        <p>
          <strong>Fecha:</strong> {new Date(order.orderDate).toLocaleString()}
        </p>
        <p>
          <strong>Estado:</strong> <Badge bg="secondary">{order.status}</Badge>
        </p>
        <p>
          <strong>Método de Pago:</strong> {order.paymentMethod}
        </p>
        <p>
          <strong>Dirección de Envío:</strong> {order.shippingAddress}
        </p>

        <hr />
        <h5>Productos</h5>
        <ListGroup variant="flush">
          {order.items.map(({ quantity, unitPrice, Product }) => (
            <ListGroup.Item key={Product.id}>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>{Product.name}</strong>
                  <div className="text-muted">
                    {quantity} x ${unitPrice.toFixed(2)}
                  </div>
                </div>
                <div>${(unitPrice * quantity).toFixed(2)}</div>
              </div>
            </ListGroup.Item>
          ))}
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

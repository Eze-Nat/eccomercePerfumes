import {
  Modal,
  Button,
  ListGroup,
  Badge,
  Row,
  Col,
  Form,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { customFetch } from "../../../../utils/fetch/customfetch";
import {
  successNotification,
  errorNotification,
} from "../../../../utils/notifications/Notifications";

const AdminOrderDetailModal = ({ show, onHide, order, onUpdate }) => {
  const [switchStatus, setSwitchStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (order) setSwitchStatus(order.status);
  }, [order]);

  if (!order) return null;
  const user = order.User || {};

  const handleStatusSubmit = async () => {
    if (switchStatus === order.status) return;

    setSaving(true);
    try {
      await customFetch(
        `/order/${order.id}`,
        "PUT",
        { status: switchStatus },
        () => {
          successNotification("Estado actualizado correctamente.");
          if (onUpdate) onUpdate();
          onHide();
        },
        (err) => {
          console.error("Error actualizando estado:", err.message);
          errorNotification("No se pudo actualizar el estado.");
        }
      );
    } finally {
      setSaving(false);
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "completed":
        return "success";
      case "canceled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de Orden #{order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <p>
              <strong>Usuario:</strong> {user.first_name} {user.last_name}
              <br />
              <strong>Email:</strong> {user.email || "No disponible"}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
              <br />
              <strong>Estado actual:</strong>{" "}
              <Badge bg={getBadgeColor(order.status)}>{order.status}</Badge>
              <Form.Select
                className="mt-2"
                value={switchStatus}
                onChange={(e) => setSwitchStatus(e.target.value)}
              >
                <option value="pending">Pendiente</option>
                <option value="processing">En proceso</option>
                <option value="shipped">Enviado</option>
                <option value="completed">Completado</option>
                <option value="canceled">Cancelado</option>
              </Form.Select>
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
          {order.items?.length > 0 ? (
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
        <Button variant="secondary" onClick={onHide} disabled={saving}>
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={handleStatusSubmit}
          disabled={saving || switchStatus === order.status}
        >
          {saving ? (
            <Spinner size="sm" animation="border" />
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminOrderDetailModal;

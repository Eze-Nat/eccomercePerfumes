import { useState, useEffect } from "react";
import { Spinner, Button, Card, Container, Row, Col } from "react-bootstrap";
import { customFetch } from "../../../utils/fetch/customfetch";
import { errorNotification } from "../../../utils/notifications/Notifications";
import OrderDetailModal from "./orders.modal/UserOrderDetailModal";
import { formatPrice } from "../../../utils/formatPrice/formatPrice";


const UserOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = () => {
    setLoading(true);
    customFetch(
      "/order/user",
      "GET",
      null,
      (data) => {
        setOrders(data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        errorNotification(
          "Error al cargar las órdenes. Por favor, inicia sesión nuevamente."
        );
      },
      false
    );
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  return (
    <Container fluid className="mt-4">
      <h3 className="mb-4">Mis Órdenes de Compra</h3>

      {loading ? (
        <div className="d-flex justify-content-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center mt-4">No hay órdenes registradas.</p>
      ) : (
        <Row>
          {orders.map((order) => (
            <Col md={6} key={order.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Orden # {order.id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Fecha:{" "}
                    {new Date(
                      order.orderDate || order.createdAt
                    ).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text>
                    Comprador:{" "}
                    <strong>
                      {order.User?.first_name} {order.User?.last_name}
                    </strong>
                    <br />
                    Estado: <strong>{order.status}</strong>
                    <br />
                    Total: <strong>${formatPrice(order.total)}</strong>
                  </Card.Text>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => openModal(order)}
                  >
                    Ver Detalles
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <OrderDetailModal
        show={showModal}
        onHide={closeModal}
        order={selectedOrder}
      />
    </Container>
  );
};

export default UserOrderList;

import { useState, useEffect } from "react";
import { Spinner, Button, Card } from "react-bootstrap";
import { customFetch } from "../../../utils/fetch/customFetch";
import { errorNotification } from "../../../utils/notifications/Notifications";
import OrderDetailModal from "./UserOrderDetailModal";

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
      "api/order/user",
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
      false // aseguramos que se envíe token para auth
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

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (orders.length === 0)
    return <p className="text-center mt-4">No hay órdenes registradas.</p>;

  return (
    <>
      <h3 className="mb-4">Mis Órdenes de Compra</h3>

      <div className="row">
        {orders.map((order) => (
          <div className="col-md-6 mb-3" key={order.id}>
            <Card>
              <Card.Body>
                <Card.Title>Orden #{order.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Fecha:{" "}
                  {new Date(
                    order.orderDate || order.createdAt
                  ).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>
                  Estado: <strong>{order.status}</strong>
                  <br />
                  Total: <strong>${order.total.toFixed(2)}</strong>
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
          </div>
        ))}
      </div>

      <OrderDetailModal
        show={showModal}
        onHide={closeModal}
        order={selectedOrder}
      />
    </>
  );
};

export default UserOrderList;

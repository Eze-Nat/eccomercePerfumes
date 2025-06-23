import { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { customFetch } from "../../../utils/fetch/customFetch";
import { errorNotification } from "../../../utils/notifications/Notifications";
import AdminOrderDetailModal from "./AdminOrderDetailModal";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = () => {
    setLoading(true);
    customFetch(
      "api/order", // todas las órdenes
      "GET",
      null,
      (data) => {
        setOrders(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error al cargar órdenes:", error.message);
        setLoading(false);
        errorNotification("No se pudieron cargar las órdenes.");
      }
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
      <h3 className="mb-4">Órdenes de Todos los Usuarios</h3>

      <div className="row">
        {orders.map((order) => (
          <div className="col-md-6 mb-3" key={order.id}>
            <Card>
              <Card.Body>
                <Card.Title>Orden #{order.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Usuario ID: {order.user_id}
                </Card.Subtitle>
                <Card.Text>
                  Fecha: {new Date(order.orderDate).toLocaleDateString()} <br />
                  Estado: <strong>{order.status}</strong> <br />
                  Total: <strong>${order.total.toFixed(2)}</strong>
                </Card.Text>
                <Button
                  variant="info"
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

      <AdminOrderDetailModal
        show={showModal}
        onHide={closeModal}
        order={selectedOrder}
      />
    </>
  );
};

export default AdminOrderList;

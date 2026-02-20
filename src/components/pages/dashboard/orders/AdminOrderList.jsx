import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { customFetch } from "../../../utils/fetch/customfetch";
import {
  errorNotification,
  successNotification,
} from "../../../utils/notifications/Notifications";
import AdminOrderDetailModal from "./orders.modal/AdminOrderDetailModal";
import { formatPrice } from "../../../utils/formatPrice/formatPrice";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = () => {
    setLoading(true);
    customFetch(
      "/order",
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
    fetchAllOrders();
  };

  const confirmDeleteOrder = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setOrderToDelete(null);
    setShowDeleteConfirm(false);
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    console.log("orden desde fetch", orderToDelete);

    setDeleting(true);
    try {
      await customFetch(`/order/${orderToDelete.id}`, "DELETE", null);
      successNotification(`Orden #${orderToDelete.id} eliminada.`);

      setOrders((prev) => prev.filter((o) => o.id !== orderToDelete.id));
      cancelDelete();
    } catch (error) {
      errorNotification("Error al eliminar la orden.");
    } finally {
      setDeleting(false);
    }
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
    <Container fluid className="mt-4">
      <h3 className="mb-4">Ordenes de Compra</h3>

      <Row>
        {orders.map((order) => (
          <Col md={6} key={order.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Orden # {order.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Usuario: {order.User?.first_name} {order.User?.last_name}
                </Card.Subtitle>
                <Card.Text>
                  Fecha: {new Date(order.orderDate).toLocaleDateString()} <br />
                  Estado: <strong>{order.status}</strong> <br />
                  Total: <strong>${formatPrice(order.total)}</strong>
                </Card.Text>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => openModal(order)}
                >
                  Ver Detalles
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmDeleteOrder(order)}
                >
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <AdminOrderDetailModal
        show={showModal}
        onHide={closeModal}
        order={selectedOrder}
      />

      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar la orden # {orderToDelete?.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={cancelDelete}
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteOrder}
            disabled={deleting}
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminOrderList;

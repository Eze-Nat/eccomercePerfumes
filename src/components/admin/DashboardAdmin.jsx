import { useState } from "react";
import Users from "./users/Users";
import OrdersDashboard from "../pages/dashboard/orders/OrderDashboard"; // Lo vamos a armar ahora
import { Button } from "react-bootstrap";

const DashboardAdmin = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(true);

  return (
    <div className="container mt-5">
      <h1>Panel de Administración</h1>
      <p>Bienvenido, administrador. Aquí podés gestionar el sitio.</p>

      <div className="mb-3">
        <Button
          variant={showUsers ? "outline-secondary" : "primary"}
          onClick={() => setShowUsers(!showUsers)}
          className="me-2"
        >
          {showUsers ? "Ocultar Gestión de Usuarios" : "Gestionar Usuarios"}
        </Button>

        <Button
          variant={showOrders ? "outline-secondary" : "primary"}
          onClick={() => setShowOrders(!showOrders)}
        >
          {showOrders ? "Ocultar Órdenes" : "Ver Órdenes"}
        </Button>
      </div>

      {showUsers && <Users />}
      {showOrders && <OrdersDashboard isAdmin={true} />}
    </div>
  );
};

export default DashboardAdmin;

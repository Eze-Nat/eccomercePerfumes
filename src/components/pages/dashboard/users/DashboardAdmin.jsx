import { useState } from "react";
import Users from "../../../admin/users/Users";
import OrdersDashboard from "../orders/OrderDashboard"; // Lo vamos a armar ahora
import { Button } from "react-bootstrap";

const DashboardAdmin = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

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
          {showUsers ? "Ocultar Usuarios" : "Usuarios"}
        </Button>

        <Button
          variant={showOrders ? "outline-secondary" : "primary"}
          onClick={() => setShowOrders(!showOrders)}
        >
          {showOrders ? "Ocultar Compras" : "Compras"}
        </Button>
      </div>

      {showUsers && <Users />}
      {showOrders && <OrdersDashboard isAdmin={true} />}
    </div>
  );
};

export default DashboardAdmin;

import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import Users from "../../../admin/users/Users";
import OrdersDashboard from "../orders/OrderDashboard";
import { Button } from "react-bootstrap";

const DashboardSuperAdmin = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const { userData } = useAuth();

  return (
    <div className="container mt-5">
      <h1>Panel de Super Administrador</h1>
      <p>Bienvenido{userData?.first_name ? `, ${userData.first_name}` : ""}</p>

      <div className="mb-3">
        <Button
          variant={showUsers ? "outline-secondary" : "primary"}
          onClick={() => setShowUsers(!showUsers)}
          className="me-2"
        >
          {showUsers ? "Ocultar Usuarios" : "Gestionar Usuarios"}
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

export default DashboardSuperAdmin;

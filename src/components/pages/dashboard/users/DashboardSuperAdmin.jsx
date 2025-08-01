import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import Users from "../../../admin/users/Users";
import OrdersDashboard from "../orders/OrderDashboard";
import { Button } from "react-bootstrap";
import ProductsDashboard from "../Products/ProductDashboard";

const DashboardSuperAdmin = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const { userData } = useAuth();

  return (
    <div className="container mt-5">
      <h1>Panel de Usuario</h1>
      <p>Bienvenido{userData?.first_name ? `, ${userData.first_name}` : ""}</p>

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
          className="me-2"
        >
          {showOrders ? "Ocultar Compras" : "Compras"}
        </Button>

        <Button
          variant={showProducts ? "outline-secondary" : "primary"}
          onClick={() => setShowProducts(!showProducts)}
          className="me-2"
        >
          {showProducts ? "Ocultar Productos" : "Productos"}
        </Button>
      </div>

      {showProducts && <ProductsDashboard isAdmin={true} />}
      {showUsers && <Users />}
      {showOrders && <OrdersDashboard isAdmin={true} />}
    </div>
  );
};

export default DashboardSuperAdmin;

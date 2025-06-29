import { useState } from "react";
import { Button } from "react-bootstrap";
import Users from "../../../admin/users/Users";
import OrdersDashboard from "../orders/OrderDashboard";
import ProductsDashboard from "../Products/ProductDashboard";

import useAuth from "../../../../hooks/useAuth";

const DashboardAdmin = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const { userData } = useAuth();

  return (
    <div className="container mt-5">
      <h1>Panel de Administración admin</h1>
      <p>Bienvenido{userData?.first_name ? `, ${userData.first_name}` : ""}</p>

      <div className="mb-3">
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
      {showOrders && <OrdersDashboard isAdmin={true} />}
    </div>
  );
};

export default DashboardAdmin;

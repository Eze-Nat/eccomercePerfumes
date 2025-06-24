import { useState } from "react";
import useAuth from "../../../../hooks/useAuth"; // Asegurate de importar correctamente tu hook
import Users from "../../../admin/users/Users";
import OrdersDashboard from "../orders/OrderDashboard";
import { Button } from "react-bootstrap";
import ProductsDashboard from "../Products/ProductDashboard";

const DashboardAdmin = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const { userData } = useAuth(); // <- Obtenemos al usuario autenticado

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
          {showOrders ? "Ocultar Productos" : "Productos"}
        </Button>
      </div>

      {showOrders && <OrdersDashboard isAdmin={true} />}
      {showProducts && <ProductsDashboard isAdmin={true} />}
      
    </div>
  );
};

export default DashboardAdmin;

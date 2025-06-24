import { useState } from "react";
import Users from "../../../admin/users/Users";
import OrdersDashboard from "../orders/OrderDashboard"; // Lo vamos a armar ahora
import { Button } from "react-bootstrap";
import ProductsDashboard from "../Products/ProductDashboard";

const DashboardAdmin = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

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

      {showUsers && <Users />}
      {showOrders && <OrdersDashboard isAdmin={true} />}
      {showProducts && <ProductsDashboard isAdmin={true} />}
    </div>
  );
};

export default DashboardAdmin;

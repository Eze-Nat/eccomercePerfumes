import { useState } from "react";
import { Button } from "react-bootstrap";
import Users from "../../../admin/users/Users";
import OrdersDashboard from "../orders/OrderDashboard";
import ProductsDashboard from "../Products/ProductDashboard";
import UserProfile from "../../../users/UsersProfile";
import useAuth from "../../../../hooks/useAuth"; // Asegurate de importar correctamente tu hook

const DashboardAdmin = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const { userData } = useAuth(); // <- Obtenemos al usuario autenticado

  return (
    <div className="container mt-5">
      <h1>Panel de Administración admin</h1>
      <p>Bienvenido{userData?.first_name ? `, ${userData.first_name}` : ""}</p>
      <UserProfile />
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
      
      {showProducts && <ProductsDashboard isAdmin={true} />}
      {showOrders && <OrdersDashboard isAdmin={true} />}
      


      </div>

      

  );
};

export default DashboardAdmin;

import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import OrdersDashboard from "../orders/OrderDashboard";
import UserProfile from "../../../users/UsersProfile";
import { Button } from "react-bootstrap";

const DashboardUser = () => {
  const { userData } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  return (
    <div className="container mt-5">
      <h1>Panel de Usuario</h1>
      <p>Bienvenido{userData?.first_name ? `, ${userData.first_name}` : ""}</p>

      <div className="mb-3">
        <Button
          variant={showProfile ? "outline-secondary" : "primary"}
          onClick={() => setShowProfile(!showProfile)}
          className="me-2"
        >
          {showProfile ? "Ocultar Perfil" : "Perfil"}
        </Button>

        <Button
          variant={showOrders ? "outline-secondary" : "primary"}
          onClick={() => setShowOrders(!showOrders)}
          className="me-2"
        >
          {showOrders ? "Ocultar Ordenes" : "Ordenes"}
        </Button>
      </div>

      {showProfile && <UserProfile />}
      {showOrders && <OrdersDashboard isAdmin={false} />}
    </div>
  );
};

export default DashboardUser;

import useAuth from "../../../../hooks/useAuth";
import OrdersDashboard from "../orders/OrderDashboard";

const DashboardUser = () => {
  const { userData } = useAuth(); // Obtenemos el usuario logueado

  return (
    <div className="container mt-5">
      <h1>Panel de Administración user</h1>
      <p>Bienvenido{userData?.first_name ? `, ${userData.first_name}` : ""}</p>
      <OrdersDashboard isAdmin={false} />
    </div>
  );
};

export default DashboardUser;

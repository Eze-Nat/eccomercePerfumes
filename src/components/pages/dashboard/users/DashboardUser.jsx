import useAuth from "../../../../hooks/useAuth";
import OrdersDashboard from "../orders/OrderDashboard";
import UserProfile from "../../../users/UsersProfile";
const DashboardUser = () => {
  const { userData } = useAuth(); // Obtenemos el usuario logueado

  return (
    <div className="container mt-5">
      <h1>Panel de Administración user</h1>
      <p>Bienvenido{userData?.first_name ? `, ${userData.first_name}` : ""}</p>
      <UserProfile />
      <OrdersDashboard isAdmin={false} />
    </div>
  );
};

export default DashboardUser;

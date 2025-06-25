import useAuth from "../../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import UserOrderList from "./UserOrderList";
import AdminOrderList from "./AdminOrderList"; // <- este lo hacemos si no lo tenés

const OrderDashboard = () => {
  const { isAuth, hasRole } = useAuth();

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div className="container mt-4">
      {hasRole(["superadmin", "admin"]) ? (
        <AdminOrderList />
      ) : (
        <UserOrderList />
      )}
    </div>
  );
};

export default OrderDashboard;

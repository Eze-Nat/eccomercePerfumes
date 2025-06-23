import { useAuth } from "../../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import UserOrderList from "./UserOrderList";
import AdminOrderList from "./AdminOrderList"; // <- este lo hacemos si no lo tenés

const OrderDashboard = () => {
  const { isAuth, role } = useAuth();

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Órdenes de Compra</h2>
      {role === "admin" ? <AdminOrderList /> : <UserOrderList />}
    </div>
  );
};

export default OrderDashboard;

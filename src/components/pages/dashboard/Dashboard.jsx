import { useAuth } from "../../../../hooks/useAuth";
import DashboardAdmin from "../../admin/DashboardAdmin";
import DashboardUser from "../dashboard/users/DashboardUser";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuth, role } = useAuth();

  if (!isAuth) return <Navigate to="/login" />;

  if (role === "admin") {
    return <DashboardAdmin />;
  }

  return <DashboardUser />;
};

export default Dashboard;

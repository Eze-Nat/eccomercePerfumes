import { useAuth } from "../../../../hooks/useAuth";
import DashboardAdmin from "../../admin/DashboardAdmin";
import DashboardUser from "../dashboard/users/DashboardUser";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuth, isTokenExpired, hasRole } = useAuth();

  if (hasRole(["superadmin", "admin"])) {
    return <DashboardAdmin />;
  }
  if (hasRole("user")) {
    return <DashboardUser />;
  }
};

export default Dashboard;

import { useAuth } from "../../../../hooks/useAuth";
import DashboardAdmin from "../dashboard/users/DashboardAdmin";
import DashboardUser from "../dashboard/users/DashboardUser";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuth, isTokenExpired, hasRole } = useAuth();

  console.log(hasRole(["superadmin", "admin"]));
  if (hasRole(["superadmin", "admin"])) {
    return <DashboardAdmin />;
  } else {
    return <DashboardUser />;
  }
};

export default Dashboard;

import useAuth from "../../../hooks/useAuth";
import DashboardUser from "./users/DashboardUser";
import DashboardAdmin from "./users/DashboardAdmin";
import DashboardSuperAdmin from "./users/DashboardSuperAdmin";

const Dashboard = () => {
  const { userData, isAuth, isTokenExpired, logout } = useAuth();

  if (!isAuth || isTokenExpired()) {
    logout("/login");
    return null;
  }

  const role = userData?.role?.toLowerCase();

  if (role === "superadmin") return <DashboardSuperAdmin />;
  if (role === "admin") return <DashboardAdmin />;
  return <DashboardUser />;
};

export default Dashboard;

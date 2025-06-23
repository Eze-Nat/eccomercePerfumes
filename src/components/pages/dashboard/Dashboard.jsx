import { useAuth } from "../../../../hooks/useAuth";
import DashboardAdmin from "../../admin/DashboardAdmin";
import DashboardUser from "./DashboardUser";

const Dashboard = () => {
  const { hasRole } = useAuth();

  if (hasRole(["superadmin","admin"])) {
    return <DashboardAdmin />;
  } 
  if (hasRole("user")) {
    return <DashboardUser />;
  }

};

export default Dashboard;

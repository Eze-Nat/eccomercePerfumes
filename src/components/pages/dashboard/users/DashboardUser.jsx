import OrdersDashboard from "../orders/OrderDashboard";

const DashboardUser = () => {
  return (
    <div className="container mt-5">
      <h1>Mis Órdenes</h1>
      <OrdersDashboard isAdmin={false} />
    </div>
  );
};

export default DashboardUser;

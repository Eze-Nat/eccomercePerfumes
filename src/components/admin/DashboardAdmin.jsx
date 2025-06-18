import { useState } from "react";
import Users from "./users/Users";
import { Button } from "react-bootstrap";

const DashboardAdmin = () => {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div className="container mt-5">
      <h1>Panel de Administración</h1>
      <p>Bienvenido, administrador. Aquí podés gestionar el sitio.</p>

      <div className="mb-3">
        <Button variant="primary" onClick={() => setShowUsers(!showUsers)}>
          {showUsers ? "Ocultar Gestión de Usuarios" : "Gestionar Usuarios"}
        </Button>
      </div>

      {showUsers && <Users />}
    </div>
  );
};

export default DashboardAdmin;

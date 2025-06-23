import { useState, useEffect } from "react";
import UserList from "./UserList";
import { customFetch } from "../../utils/fetch/customFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserListContainer = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = () => {
    customFetch(
      "api/users",
      "GET",
      null,
      (data) => setUsers(data),
      (error) => {
        console.error("Error al obtener usuarios:", error);
        toast.error("Sesión expirada. Iniciá sesión nuevamente.");
        navigate("/login");
      }
    );
  };

  const fetchRoles = () => {
    customFetch(
      "api/roles",
      "GET",
      null,
      (data) => setRoles(data),
      (error) => {
        console.error("Error al obtener roles:", error);
        toast.error("No se pudieron cargar los roles.");
      }
    );
  };

  const handleModal = (user) => {
    console.log("Eliminar usuario:", user);
  };

  const handleEdit = (user) => {
    console.log("Editar usuario:", user);
  };

  return (
    <UserList
      users={users}
      roles={roles}
      onModal={handleModal}
      onEdit={handleEdit}
    />
  );
};

export default UserListContainer;

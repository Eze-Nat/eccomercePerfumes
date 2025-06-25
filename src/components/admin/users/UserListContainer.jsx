import { useState, useEffect } from "react";
import UserList from "./UserList";
import { customFetch } from "../../utils/fetch/customFetch.js";
import { useNavigate } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../../utils/notifications/Notifications.jsx";

const UserListContainer = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const fetchRoles = async () => {
    customFetch(
      "/roles/",
      "GET",
      null,
      (data) => {
        setRoles(data);
      },
      (error) => {
        const mensaje =
          error?.message || error?.error || "Error al traer los roles.";
        errorNotification(mensaje);
        console.error("Error al traer los roles:", error);
      }
    );
  };

  const fetchUsers = async () => {
    customFetch(
      "/users/",
      "GET",
      null,
      (data) => {
        setUsers(data);
      },
      (error) => {
        const mensaje =
          error?.message || error?.error || "Error al traer los usuarios.";
        errorNotification(mensaje);
        console.error("Error al traer los usuarios:", error);
      }
    );
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

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

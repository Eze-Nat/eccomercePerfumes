import { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Modal } from 'react-bootstrap';
import UserForm from './UserForm';
import UserList from './UserList';
import { customFetch } from '../../utils/fetch/customfetch.js';
import { errorNotification, successNotification } from '../../utils/notifications/Notifications.jsx';

const Users = () => {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [idEditUser, setIdEditUser] = useState(null);

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role_id: '',
    password: '',
    confirmPassword: '',
    active: true,
    address: ''
  });

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
    fetchRoles();
    fetchUsers();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    clearUserData();
  };

  const handleListForm = () => {
    setShowList(!showList);
  };

  const clearUserData = () => {
    setUserData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      role_id: '',
      password: '',
      confirmPassword: '',
      active: true,
      address: ''
    });
  };


  const handleFormSuccess = (message, newUser) => {
    

    if (isEditing) {
      customFetch(
        `/users/${idEditUser}`,
        "PUT",
        newUser,
        () => {
          successNotification(message);
          setIdEditUser(null);
          handleShowForm();
          fetchUsers();
        },
        (error) => {
          const mensaje =
            error?.message || error?.error || "Error al actualizar el usuario.";
          errorNotification(mensaje);
          console.error("Error al actualizar el usuario", error);
        }
      );
    }

    else {
      customFetch(
        `/users/`,
        "POST",
        newUser,
        () => {
          successNotification(message);
          handleShowForm();
          fetchUsers();
        },
        (error) => {
          const mensaje =
            error?.message || error?.error || "Error al crear el usuario.";
          errorNotification(mensaje);
          console.error("Error al crear el usuario", error);
        }
      );
    }

  };

  const handleFormError = (message) => {
    errorNotification(message)
  };

  const handleModal = (userToDeleteInfo) => {
    setUserToDelete(userToDeleteInfo);
    setShowDeleteModal(true);
  };

    const handleDeactivate = () => {
    if (userToDelete) {
      customFetch(
        `/users/${userToDelete.id}`,
        "PUT",
        { ...userToDelete, active: false },
        () => {
          successNotification('Usuario desactivado correctamente');
          setShowDeleteModal(false);
          fetchUsers();
        },
        (error) => {
          const mensaje =
            error?.message || error?.error || "Error al desactivar el usuario.";
          errorNotification(mensaje);
          console.error("Error al desactivar el usuario", error);
        }
      );
    }
  };

  const handleDelete = () => {
    if (userToDelete) {
      customFetch(
        `/users/${userToDelete.id}`,
        "DELETE",
        null,
        () => {
          successNotification('Usuario eliminado correctamente')
          setShowDeleteModal(false);
          fetchUsers();
        },
        (error) => {
          const mensaje =
            error?.message || error?.error || "Error al eliminar el usuario.";
          errorNotification(mensaje);
          console.error("Error al eliminar el usuario", error);
        }
      );
    };
  };
  const handleEditUser = (user) => {
    setIdEditUser(user.id);
    setUserData({
      ...user,
      active: user.active !== undefined ? user.active : true,
      address: user.address || ''
    });
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <Container fluid className="mt-4">

      <Row className="mb-3">
        <Col>
          {!showList && (
            <Button
              variant={showForm ? 'outline-secondary' : 'primary'}
              onClick={handleShowForm}
              className="me-2"
            >
              {showForm ? 'Cancelar' : 'Añadir Usuario'}
            </Button>
          )}

          <Button
            variant="info"
            onClick={handleListForm}
          >
            {showList ? 'Ocultar Usuarios' : 'Mostrar Usuarios'}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <UserForm
          editingUser={isEditing}
          userData={userData}
          initialRoles={roles}
          onCancel={handleShowForm}
          onSuccess={handleFormSuccess}
          onError={handleFormError}
        />
      )}

      {showList && (
        <UserList
          users={users}
          roles={roles}
          onEdit={handleEditUser}
          onModal={handleModal}
        />
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Acciones de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Al eliminar el usuario {userToDelete?.first_name} {userToDelete?.last_name}, se eliminarán todos sus pedidos y datos asociados. Podes desactivarlo si no queres eliminarlo permanentemente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={handleDeactivate}>
            Desactivar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;
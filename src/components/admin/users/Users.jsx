import { useState } from 'react';
import { Container, Alert, Button, Row, Col, Modal } from 'react-bootstrap';
import UserForm from './UserForm';
import UserList from './UserList';

const Users = () => {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [idEditUser,setIdEditUser] = useState(null);

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    rolId: '',
    password: '',
    confirmPassword: ''
  });

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000);
  };

  const fetchRoles = async () => {
    try {
      const mockRoles = [
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Usuario' },
      ];
      setRoles(mockRoles);
    } catch (error) {
      showAlert('Error al cargar los roles', 'danger');
    }
  };

  const fetchUsers = async () => {
    try {
      const mockUsers = [
        { id: 1, first_name: 'Juan', last_name: 'Pérez', email: 'juan@example.com', phone: '123456789', rolId: 1 },
        { id: 2, first_name: 'María', last_name: 'Gómez', email: 'maria@example.com', phone: '987654321', rolId: 2 },
      ];
      setUsers(mockUsers);
    } catch (error) {
      showAlert('Error al cargar los usuarios', 'danger');
    }
  };
  
  const handleShowForm = () => {
    if (!showForm && roles.length === 0) {
      fetchRoles();
    }
    setShowForm(!showForm);
    setIsEditing(false);
    clearUserData();
  };

  const handleListForm = () => {
    if (!showList && roles.length === 0) {
      fetchRoles();
    }
    if (!showList && users.length === 0) {
      fetchUsers();
    }
    setShowList(!showList);
  };

  const clearUserData = () => {
    setUserData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      rolId: '',
      password: '',
      confirmPassword: ''
    });
  };

  
  const handleFormSuccess = (message, newUser) => {
    showAlert(message, 'success');
    setUsers(prevUsers => {
      const lastId = prevUsers.length > 0 ? prevUsers[prevUsers.length - 1].id : 0;
      const userWithId = { ...newUser, id: lastId + 1 };
      return [...prevUsers, userWithId]}
    );
    handleShowForm();
  };

  const handleFormError = (message) => {
    showAlert(message, 'danger');
  };

  const handleModal = (userToDeleteInfo) => {
    setUserToDelete(userToDeleteInfo);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      try {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
        showAlert('Usuario eliminado correctamente', 'success');
        setShowDeleteModal(false);
      } catch (error) {
        showAlert('Error al eliminar el usuario', 'danger');
      }
    }
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
  
  const handleEditSuccess = (message, updatedUser) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    showAlert(message, 'success');
    setShowForm(false);
    clearUserData();
  };

  return (
    <Container fluid className="mt-4">
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({...alert, show: false})} dismissible>
          {alert.message}
        </Alert>
      )}

      <Row className="mb-3">
        <Col>
          {!showList && (
            <Button
              variant={showForm ? "outline-secondary" : "primary"}
              onClick={handleShowForm}
              className="me-2"
            >
              {showForm ? "Cancelar" : "Añadir Usuario"}
            </Button>
          )}

          <Button variant="info" onClick={handleListForm}>
            {showList ? "Ocultar Usuarios" : "Mostrar Usuarios"}
          </Button>
        </Col>
      </Row>

      {showForm && (
        isEditing ? (
          <UserForm 
            isAdmin={true} 
            editingUser={true} 
            userData={userData} 
            roles={roles}
            onCancel={handleShowForm}
            onSuccess={handleEditSuccess} 
            onError={handleFormError}   
          />
        ) : (
          <UserForm 
            isAdmin={true}
            roles={roles}
            onCancel={handleShowForm}
            userData={userData}
            onSuccess={handleFormSuccess}
            onError={handleFormError}
          />
        )
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
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar al usuario{" "}
          {userToDelete?.first_name} {userToDelete?.last_name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
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

import { useState, useEffect } from 'react';
import { Card, InputGroup, FormControl, Badge, Alert, Button } from 'react-bootstrap';

const UserList = ({ users = [], roles = [], onModal, onEdit }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    handleUsersFilter(searchTerm);
  }, [users]);

  const handleUsersFilter = (newSearchTerm) => {
    const filtered = users.filter(user =>
      `${user.first_name} ${user.last_name} ${user.email} ${user.address}`
        .toLowerCase()
        .includes(newSearchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    handleUsersFilter(e.target.value);
  }

  const getRoleName = (role_id) => {
    const role = roles.find(r => r.id === Number(role_id));
    return role ? role.name : 'Desconocido';
  };

  return (
    <div className="bg-dark p-4 rounded-3">
      <Card className="border-0 bg-dark text-light">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0 text-light">Lista de Usuarios</h4>
            <InputGroup style={{ width: '300px' }}>
              <FormControl
                placeholder="Buscar por Nombre, Apellido, Email o Dirección..."
                value={searchTerm}
                onChange={handleOnChange}
                className="bg-secondary text-light border-dark"
              />
            </InputGroup>
          </div>

          {filteredUsers.length === 0 ? (
            <Alert variant="secondary">
              {searchTerm ? 'No hay usuarios que coincidan con la búsqueda' : 'No hay usuarios registrados'}
            </Alert>
          ) : (
            <div className="row">
              {filteredUsers.map(user => (
                <div className="col-md-6 col-lg-4 mb-4" key={user.id}>
                  <Card className="bg-secondary text-light border-dark">
                    <Card.Body>
                      <Card.Title>
                        {user.first_name} {user.last_name}
                        <Badge
                          bg={user.active ? "success" : "danger"}
                          className="ms-2"
                        >
                          {user.active ? "Activo" : "Inactivo"}
                        </Badge>
                      </Card.Title>
                      <Card.Text>
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Celular:</strong> {user.phone}</div>
                        <div><strong>Dirección:</strong> {user.address || 'Sin dirección'}</div>
                        <div>
                          <strong>Rol:</strong> {' '}
                          <Badge bg={user.role_id === 1 ? 'primary' : 'secondary'}>
                            {getRoleName(user.role_id)}
                          </Badge>
                        </div>
                      </Card.Text>
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="light"
                          onClick={() => onEdit(user)}
                          className="me-2 custom-btn-edit"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onModal(user)}
                          className="custom-btn-delete"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserList;
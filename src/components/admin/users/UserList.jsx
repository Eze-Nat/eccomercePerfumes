import { useState } from 'react';
import { Card, InputGroup, FormControl, Badge, Alert, Button } from 'react-bootstrap';

const UserList = ({ users = [], roles = [], onModal, onEdit }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');


const handleUsersFilter = (newSearchTerm) => {
    const filtered = users.filter(user => 
      `${user.first_name} ${user.last_name} ${user.email} ${user.address}`
        .toLowerCase()
        .includes(newSearchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    console.log(filtered)
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    handleUsersFilter(e.target.value);
  }

  const getRoleName = (role_id) => {
    const role = roles.find(r => r.id === role_id);
    return role ? role.name : 'Desconocido';
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Lista de Usuarios</h4>
          <InputGroup style={{ width: '300px' }}>
            <FormControl
              placeholder="Buscar por Nombre, Apellido, Email o Dirección..."
              value={searchTerm}
              onChange={handleOnChange}
            />
          </InputGroup>
        </div>

        {filteredUsers.length === 0 ? (
          <Alert variant="info">
            {searchTerm ? 'No hay usuarios que coincidan con la búsqueda' : 'No hay usuarios registrados'}
          </Alert>
        ) : (
          <div className="row">
            {filteredUsers.map(user => (
              <div className="col-md-6 col-lg-4 mb-4" key={user.id}>
                <Card>
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
                        <Badge bg={user.role_Id === 1 ? 'primary' : 'secondary'}>
                          {getRoleName(user.role_Id)}
                        </Badge>
                      </div>
                    </Card.Text>
                    <div className="d-flex justify-content-end">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => onEdit(user)}
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => onModal(user)}
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
  );
};

export default UserList;
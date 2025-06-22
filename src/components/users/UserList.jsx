import { useState, useEffect } from 'react';
import { Card, InputGroup, FormControl, Badge, Alert, Button } from 'react-bootstrap';

const UserList = ({ users = [], roles = [], onModal, onEdit }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [users, searchTerm]);

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : 'Desconocido';
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Lista de Usuarios</h4>
          <InputGroup style={{ width: '300px' }}>
            <FormControl
              placeholder="Buscar por Nombre y/o Apellido..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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
                    </Card.Title>
                    <div>
                      <div><strong>Email:</strong> {user.email}</div>
                      <div><strong>Celular:</strong> {user.phone || 'No especificado'}</div>
                      <div>
                        <strong>Rol:</strong>{' '}
                        <Badge bg={user.role_id === 1 ? 'primary' : 'secondary'}>
                          {user.Role?.name || getRoleName(user.role_id)}
                        </Badge>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
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

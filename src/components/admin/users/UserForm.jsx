import { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

const UserForm = ({
  editingHimself = false,
  editingUser = false,
  userData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role_id: '',
    password: '',
    confirmPassword: '',
    active: true,
    address: ''
  },
  onCancel = () => {},
  onSuccess = () => {},
  onError = () => {},
  initialRoles = [{ id: 3, name: 'Usuario' }]
}) => {
  const [validated, setValidated] = useState(false);
  const [roles, setRoles] = useState(initialRoles);
  const { hasRole } = useAuth();
  
  const isAdmin = hasRole(['superadmin', 'admin']);
  
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    setFormData({
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role_id: userData.role_id || (roles.length > 0 ? roles[0].id : ''),
      password: '',
      confirmPassword: '',
      active: userData.active !== undefined ? userData.active : true,
      address: userData.address || ''
    });
  }, [userData]);

  useEffect(() => {
    if (editingUser && hasRole("admin")) {
      setRoles(prevRoles => prevRoles.filter(role => role.id !== 1));
    }
  }, [editingUser]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      onError('Las contraseñas no coinciden');
      return;
    }

    const finalFormData = !isAdmin 
      ? { ...formData, role_id: '3' } 
      : formData;

    try {
      const successMessage = editingUser 
        ? 'Usuario actualizado correctamente' 
        : 'Usuario creado correctamente';
      onSuccess(successMessage, finalFormData);
    } catch (error) {
      onError(error.message || 'Error al guardar el usuario');
    }
  };

  const passwordRequired = !editingUser;
  const passwordFeedback = editingUser 
    ? 'Ingresa una contraseña para actualizarla' 
    : 'Por favor ingresa una contraseña';

  return (
    <div className="bg-dark p-4 rounded-3">
      <Card className="mb-4 border-0 bg-dark text-light">
        <Card.Body>
          <h4 className="mb-4 text-light">{editingUser ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}</h4>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="first_name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary text-light border-dark"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa un Nombre
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="last_name">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary text-light border-dark"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa un Apellido
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {!editingHimself && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary text-light border-dark"
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingresa un email válido
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
              <Col md={editingHimself ? 12 : 6}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary text-light border-dark"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa un número de Celular
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-secondary text-light border-dark"
                  />
                </Form.Group>
              </Col>
              { !editingHimself && (
              <Col md={6}>
                <Form.Group className="mb-3" controlId="active">
                  <Form.Label>Estado</Form.Label>
                  <div className="mt-2">
                    <Form.Check 
                      type="switch"
                      id="active-switch"
                      label="Usuario activo"
                      name="active"
                      checked={formData.active}
                      onChange={handleInputChange}
                    />
                  </div>
                </Form.Group>
              </Col>
              )};
            </Row>

            {(!editingHimself && isAdmin) && (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="role_id">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select
                      name="role_id"
                      value={formData.role_id}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary text-light border-dark"
                    >
                      <option value="">Seleccione un rol</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Por favor selecciona un rol
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>          
            )}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={passwordRequired}
                    className="bg-secondary text-light border-dark"
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordFeedback}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={passwordRequired}
                    className="bg-secondary text-light border-dark"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor confirma tu contraseña
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-light" onClick={onCancel}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingUser ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserForm;
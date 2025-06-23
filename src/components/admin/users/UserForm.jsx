import { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

const UserForm = ({
  isAdmin = false,
  editingUser = false,
  userData = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    role_id: "",
    password: "",
    confirmPassword: "",
  },
  onCancel = () => {},
  onSuccess = () => {},
  onError = () => {},
  roles = [{ id: 1, name: "Usuario" }],
}) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    role_id: userData.role_id || (roles.length > 0 ? roles[0].id : ""),
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Asignar role_id por defecto si no es admin
    const finalFormData = !isAdmin ? { ...formData, role_id: 1 } : formData;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      onError("Las contraseñas no coinciden");
      return;
    }

    try {
      const successMessage = editingUser
        ? "Usuario actualizado correctamente"
        : "Usuario creado correctamente";

      onSuccess(successMessage, finalFormData);
    } catch (error) {
      onError("Error al guardar el usuario");
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h4 className="mb-4">
          {editingUser ? "Editar Usuario" : "Añadir Nuevo Usuario"}
        </h4>
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
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingresa un Apellido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingresa un email válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingresa una dirección
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingresa un número de Celular
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {isAdmin && (
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="role_id">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select
                    name="role_id"
                    value={formData.role_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione un rol</option>
                    {roles.map((role) => (
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
                  required={!editingUser}
                />
                <Form.Control.Feedback type="invalid">
                  {editingUser
                    ? "Ingresa una contraseña para actualizarla"
                    : "Por favor ingresa una contraseña"}
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
                  required={!editingUser}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor confirma tu contraseña
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onCancel} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingUser ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserForm;

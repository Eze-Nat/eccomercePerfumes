import { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import UserForm from "../admin/users/UserForm.jsx";
import { customFetch } from "../utils/fetch/customfetch.js";
import {
  errorNotification,
  successNotification,
} from "../utils/notifications/Notifications.jsx";
import useAuth from "../../hooks/useAuth.jsx";

const UsersProfile = () => {
  const { userData: dataOfUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role_id: "",
    password: "",
    confirmPassword: "",
    active: true,
    address: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    customFetch(
      `/users/${dataOfUser.id}`,
      "GET",
      null,
      (data) => {
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          role_id: data.role_id || "",
          password: "",
          confirmPassword: "",
          active: data.active !== undefined ? data.active : true,
          address: data.address || "",
        });
      },
      (error) => {
        errorNotification(
          error?.message ||
            error?.error ||
            "Error al traer los datos del usuario."
        );
      }
    );
  };

  const handleFormSuccess = (message, updatedData) => {
    successNotification(message || "Perfil actualizado correctamente.");
    setEditing(false);
    fetchUserData();
  };

  const handleFormError = (message) => {
    errorNotification(message);
  };

  return (
    <Container fluid className="mt-4">
      <h3 className="mb-4">Información de Perfil</h3>

      {editing ? (
        <UserForm
          editingHimself={true}
          editingUser={true}
          userData={formData}
          onCancel={() => setEditing(false)}
          onSuccess={handleFormSuccess}
          onError={handleFormError}
        />
      ) : (
        <Row>
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <p>
                  <strong>Nombre:</strong> {formData.first_name}{" "}
                  {formData.last_name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Dirección:</strong> {formData.address}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setEditing(true)}
                >
                  Modificar mi Perfil
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UsersProfile;

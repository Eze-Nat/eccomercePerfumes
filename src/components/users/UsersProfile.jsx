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
  const { userData: dataOfUser, setUserData } = useAuth();
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
    fetchUserCurrentData();
  }, []);

  const fetchUserCurrentData = () => {
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
  customFetch(
    `/users/${dataOfUser.id}`,
    "PUT",
    updatedData,
    (data) => {
      const updatedUser = {
        ...dataOfUser,
        ...data,
      };

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

      setUserData(updatedUser);

      successNotification(message || "Perfil actualizado correctamente.");
    },
    (error) => {
      const error_mensaje =
        error?.message || error?.error || "Error al actualizar el perfil.";
      errorNotification(error_mensaje);
      console.error("Error al actualizar el perfil:", error);
    }
  );

  setEditing(false);
};

  const handleFormError = (message) => {
    errorNotification(message);
  };

  return (
    <Container fluid className="mt-4 bg-dark p-4 rounded-3 text-light">
      <h3 className="mb-4 text-light">Información de Perfil</h3>

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
            <Card className="border-0 bg-secondary text-light">
              <Card.Body>
                <p>
                  <strong>Nombre:</strong> {formData.first_name}{" "}
                  {formData.last_name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {formData.phone || "No especificado"}
                </p>
                <p>
                  <strong>Dirección:</strong> {formData.address || "No especificada"}
                </p>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => setEditing(true)}
                  className="mt-2"
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

import { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import UserForm from '../admin/users/UserForm.jsx';
import { customFetch } from '../utils/fetch/customfetch.js';
import { errorNotification, successNotification } from '../utils/notifications/Notifications.jsx';
import useAuth from '../../hooks/useAuth.jsx';

const UsersProfile = () => {
    const [showProfileForm, setShowProfileForm] = useState(false);
    const { userData: dataOfUser } = useAuth();

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

    const fetchUserData = async () => {
        customFetch(
            `/users/${dataOfUser.id}`,
            "GET",
            null,
            (data) => {
                setFormData({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    role_id: data.role_id || '',
                    password: '',
                    confirmPassword: '',
                    active: data.active !== undefined ? data.active : true,
                    address: data.address || ''
                });
            },
            (error) => {
                const mensaje =
                    error?.message || error?.error || "Error al traer los datos del usuario.";
                errorNotification(mensaje);
                console.error("Error al traer los datos del usuario:", error);
            }
        );
    };

    const handleShowForm = () => {
        setShowProfileForm(prev => !prev);
        fetchUserData();
    };

    const clearFormData = () => {
        setFormData({
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

    const handleFormSuccess = (message, updatedData) => {
        successNotification(message || "Perfil actualizado correctamente.");
        setShowProfileForm(false);
        clearFormData();
        customFetch(
            `/users/${dataOfUser.id}`,
            "PUT",
            updatedData,
            () => {
                successNotification(message || "Perfil actualizado correctamente.");
                setShowProfileForm(false);
            },
            (error) => {
                const error_mensaje = error?.message || error?.error || "Error al actualizar el perfil.";
                errorNotification(error_mensaje);
                console.error("Error al actualizar el perfil:", error);
            }
        );
    };

    const handleFormError = (message) => {
        errorNotification(message);
    };

    return (
        <Container fluid className="mt-4">
            <Row className="mb-3">
                <Col>
                    <Button
                        variant={showProfileForm ? 'outline-secondary' : 'primary'}
                        onClick={handleShowForm}
                        className="me-2"
                    >
                        {showProfileForm ? 'Cancelar' : 'Modificar mi Perfil'}
                    </Button>
                </Col>
            </Row>

            {showProfileForm && (
                <UserForm
                    editingHimself={true}
                    editingUser={true}
                    userData={formData}
                    onCancel={handleShowForm}
                    onSuccess={handleFormSuccess}
                    onError={handleFormError}
                />
            )}
        </Container>
    );
};
export default UsersProfile;
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../utils/fetch/customfetch";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../utils/notifications/Notifications";
import AuthContext from "../../contexts/auth/Auth.Context"; // Importa el contexto de autenticación

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Accede a la función login del contexto

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "El nombre es obligatorio.";
    if (!formData.last_name.trim())
      newErrors.last_name = "El apellido es obligatorio.";
    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Correo no válido.";
    if (!formData.address.trim())
      newErrors.address = "La dirección es obligatoria.";
    if (formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      warningNotification("Corregí los errores antes de continuar.");
      return;
    }

    const userData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      address: formData.address,
      password: formData.password,
    };

    customFetch(
      "/auth/register",
      "POST",
      userData,
      (data) => {
        successNotification("Registro exitoso");
        login(data);
        navigate("/dashboard");
      },
      (error) => {
        if (error.status === 409) {
          errorNotification("El correo ya está registrado.");
        } else {
          errorNotification("Error al registrarse. Intentalo más tarde.");
        }
      }
    );
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear cuenta</h2>

      <input
        type="text"
        name="first_name"
        placeholder="Nombre"
        value={formData.first_name}
        onChange={handleChange}
      />
      {errors.first_name && <p className="text-danger">{errors.first_name}</p>}

      <input
        type="text"
        name="last_name"
        placeholder="Apellido"
        value={formData.last_name}
        onChange={handleChange}
      />
      {errors.last_name && <p className="text-danger">{errors.last_name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
      />
      {errors.email && <p className="text-danger">{errors.email}</p>}

      <input
        type="text"
        name="address"
        placeholder="Dirección"
        value={formData.address}
        onChange={handleChange}
      />
      {errors.address && <p className="text-danger">{errors.address}</p>}

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
      />
      {errors.password && <p className="text-danger">{errors.password}</p>}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar contraseña"
        value={formData.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
      />
      {errors.confirmPassword && (
        <p className="text-danger">{errors.confirmPassword}</p>
      )}

      <button
        type="button"
        onClick={handleCancel}
        style={{ marginLeft: "10px" }}
      >
        Cancelar
      </button>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;

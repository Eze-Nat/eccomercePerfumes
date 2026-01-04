import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../utils/fetch/customfetch";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "../utils/notifications/Notifications";
import AuthContext from "../../contexts/auth/Auth.Context";
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
  const { login } = useContext(AuthContext);

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
        login(data.token);
        navigate("/");
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
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div
        className="card border-0 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(30, 30, 30, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="card-body p-4 p-md-5">
          <h2 className="text-center mb-4 text-white">Crear cuenta</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-white-50">Nombre</label>
              <input
                type="text"
                name="first_name"
                className={`form-control bg-dark text-white border-secondary ${
                  errors.first_name ? "is-invalid" : ""
                }`}
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
              />
              {errors.first_name && (
                <div className="invalid-feedback d-block">
                  {errors.first_name}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-white-50">Apellido</label>
              <input
                type="text"
                name="last_name"
                className={`form-control bg-dark text-white border-secondary ${
                  errors.last_name ? "is-invalid" : ""
                }`}
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Ingresa tu apellido"
              />
              {errors.last_name && (
                <div className="invalid-feedback d-block">
                  {errors.last_name}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-white-50">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                className={`form-control bg-dark text-white border-secondary ${
                  errors.email ? "is-invalid" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@email.com"
                autoComplete="email"
              />
              {errors.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-white-50">Dirección</label>
              <input
                type="text"
                name="address"
                className={`form-control bg-dark text-white border-secondary ${
                  errors.address ? "is-invalid" : ""
                }`}
                value={formData.address}
                onChange={handleChange}
                placeholder="Tu dirección completa"
              />
              {errors.address && (
                <div className="invalid-feedback d-block">{errors.address}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-white-50">Contraseña</label>
              <input
                type="password"
                name="password"
                className={`form-control bg-dark text-white border-secondary ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
              />
              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label text-white-50">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control bg-dark text-white border-secondary ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback d-block">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn btn-outline-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary px-4">
                Registrarse
              </button>
            </div>
          </form>

          <div className="text-center mt-4 pt-3 border-top border-secondary">
            <p className="text-white-50 mb-0">
              ¿Ya tienes cuenta?{" "}
              <span
                className="text-primary"
                role="button"
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Inicia sesión aquí
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

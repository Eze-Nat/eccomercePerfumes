import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../utils/fetch/customfetch";
import {
  errorNotification,
  successNotification,
} from "../utils/notifications/Notifications";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, hasRole } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const credentials = { email, password };

  await customFetch(
    "/auth/login",
    "POST",
    credentials,
    (data) => {
      if (!data?.token) {
        errorNotification("Credenciales incorrectas.");
        setLoading(false);
        return;
      }

      const decoded = login(data.token);

      if (!decoded) {
        errorNotification("Error procesando sesión");
        setLoading(false);
        return;
      }

      successNotification("¡Inicio de sesión exitoso!");

      if (decoded.role === "admin" || decoded.role === "superadmin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      setLoading(false);
    },
(error) => {
  errorNotification(error?.message || "Error al iniciar sesión.");
  setLoading(false);
}
    
  );
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
          <h2 className="text-center mb-4 text-white">Iniciar sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="inputEmail" className="form-label text-white-50">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control bg-dark text-white border-secondary"
                id="inputEmail"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="inputPassword"
                className="form-label text-white-50"
              >
                Contraseña
              </label>
              <input
                type="password"
                className="form-control bg-dark text-white border-secondary"
                id="inputPassword"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid gap-2 mb-3">
              <button
                type="submit"
                className="btn btn-primary py-2"
                disabled={loading}
              >
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn btn-link text-white-50"
              >
                Volver al inicio
              </button>
            </div>
          </form>

          <div className="text-center mt-4 pt-3 border-top border-secondary">
            <p className="text-white-50 mb-0">
              ¿No tenés cuenta?{" "}
              <span
                className="text-primary"
                role="button"
                onClick={() => navigate("/register")}
                style={{ cursor: "pointer" }}
              >
                Registrate acá
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

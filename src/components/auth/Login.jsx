import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../utils/fetch/customFetch";
import { errorNotification, successNotification } from "../utils/notifications/Notifications";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credentials = { email, password };

    customFetch(
      "/auth/login",
      "POST",
      credentials,
      (data) => {
        console.log("DATA RECIBIDA:", data); // linea para eliminar
        login(data.token);
        successNotification("¡Inicio de sesión exitoso!");
        navigate("/dashboard");
        setLoading(false);
      },
      (error) => {
        const mensaje =
          error?.message || error?.error || "Error al iniciar sesión.";
        errorNotification(mensaje);
        console.error("Error al iniciar sesión:", error);
        setLoading(false);
      },
      true
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn btn-secondary ms-2"
        >
          Cancelar
        </button>
      </form>

      <p className="mt-3">
        ¿No tenés cuenta?{" "}
        <span
          className="text-primary"
          role="button"
          onClick={() => navigate("/register")}
        >
          Registrate acá
        </span>
      </p>
    </>
  );
};

export default Login;

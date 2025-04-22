import { useState } from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sesion iniciada");
    navigate("/");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleButtonCancel = () => {
    navigate("/");
  };

  const handleButtonToRegister = () => {
    navigate("/Register");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Correo electronico
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            value={email}
            aria-describedby="emailHelp"
            onChange={handleEmailChange}
            required
          />
          <div id="emailHelp" className="form-text">
            Nunca compartiremos tu correo electrónico con nadie más.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
        <button onClick={handleButtonCancel} className="btn btn-primary">
          Cerrar
        </button>
      </form>
      <p className="mt-3">
        ¿No tenés cuenta?{" "}
        <span
          className="text-primary"
          role="button"
          onClick={handleButtonToRegister}
        >
          Registrate acá
        </span>
      </p>
    </>
  );
};

export default Login;

import { useState } from "react";
import Register from "./Register";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sesion iniciada");

    //modal de inicio de sesion aceptado
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <div class="mb-3">
          <label for="inputEmail" class="form-label">
            Correo electronico
          </label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            value={email}
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div id="emailHelp" class="form-text">
            Nunca compartiremos tu correo electrónico con nadie más.
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">
            Contraseña
          </label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
        {/* <button onClick={cerrar} className="btn btn-primary">
        Cerrar
        </button> */}
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

import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { useCart } from "../../../contexts//cart/CartContextProvider"; // Importamos el carrito
import "./navbar.css";

const Navbar = ({ onSearchPerfume }) => {
  const { cart } = useCart(); // Extraemos el carrito
  const [searchPerfume, setSearchPerfume] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleOnChange = (event) => {
    const newSearchPerfume = event.target.value;
    setSearchPerfume(newSearchPerfume);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearchPerfume(newSearchPerfume);
    }, 1500); // Reducimos el tiempo de debounce
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearchPerfume(searchPerfume);
  };

  return (
    <nav className="navbar fixed-top navbar-dark bg-dark px-4">
      <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            Perfumería El Turco
          </Link>
        <div className="flex-grow-1 d-flex justify-content-center">
          <form className="d-flex" role="search" onSubmit={handleOnSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar perfume"
              aria-label="Buscar"
              onChange={handleOnChange}
              value={searchPerfume}
            />
            <button className="btn btn-outline-light" type="submit">
              Buscar
            </button>
          </form>
        </div>

        <div className="d-flex align-items-center gap-3">
          <a href="/login" className="text-white" title="Iniciar sesión">
            <i className="bi bi-person fs-4"></i>
          </a>
          <a
            href="/cart"
            className="text-white position-relative"
            title="Carrito"
          >
            <i className="bi bi-cart2 fs-4"></i>
            {cart.length > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {cart.length}
              </span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

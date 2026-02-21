import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../../contexts//cart/CartContextProvider";
import useAuth from "../../../hooks/useAuth";
import "./navbar.css";



const Navbar = ({ onSearchPerfume }) => {
  const { cart } = useCart();
  const [searchPerfume, setSearchPerfume] = useState("");
  const timeoutRef = useRef(null);
  const { isAuth, logout } = useAuth();
  const location = useLocation();

  const showSearchBar = ["/", "/search"].includes(location.pathname);

  

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
    }, 1500);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearchPerfume(searchPerfume);
  };

  const handleLogout = () => {
    setSearchPerfume("");
    logout();
  };

  return (
    <nav className="navbar fixed-top navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" replace>
          Perfumería El Turco
        </Link>

        {showSearchBar && (
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
        )}

        <div className="d-flex align-items-center gap-3">
          {isAuth ? (
            <>
              <NavLink
                to="/dashboard"
                replace
                className={({ isActive }) =>
                  `text-white ${isActive ? "active-link" : ""}`
                }
                title="Dashboard"
              >
                <i className="bi bi-person fs-4"></i>
              </NavLink>

              <button
                onClick={handleLogout}
                className="btn btn-link text-white"
                title="Cerrar sesión"
              >
                <i className="bi bi-box-arrow-right fs-4"></i>
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              replace
              className={({ isActive }) =>
                `text-white ${isActive ? "active-link" : ""}`
              }
              title="Iniciar sesión"
            >
              <i className="bi bi-person fs-4"></i>
            </NavLink>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-white position-relative ${isActive ? "active-link" : ""}`
            }
            title="Carrito"
          >
            <i className="bi bi-cart2 fs-4"></i>
            {cart.length > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

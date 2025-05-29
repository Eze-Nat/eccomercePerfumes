import { useEffect, useRef, useState } from "react";
import "./navbar.css";

const Navbar = ({onSearchPerfume}) => {
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
    const newSearchPerfume=event.target.value;
    setSearchPerfume(newSearchPerfume);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
        onSearchPerfume(newSearchPerfume);
      }, 3000);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearchPerfume(searchPerfume);
  };

  return (
    <nav className="navbar fixed-top navbar-dark bg-dark px-4 ">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">
          Perfumería El Turco
        </a>
        <div className="flex-grow-1 d-flex justify-content-center">
          <form 
            className="d-flex" 
            role="search"
            onSubmit={handleOnSubmit}
          >
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
          <a
            href="/login"
            className="text-white"
            title="Iniciar sesión"
            // onClick={() => setMostrarLogin(false)}
          >
            <i className="bi bi-person fs-4"></i>
          </a>
          <a href="#" className="text-white" title="Carrito">
            <i className="bi bi-cart2 fs-4"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const Navbar = () => {
  return (
    <nav className="navbar fixed-top navbar-dark bg-dark px-4 ">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">
          Perfumería El Turco
        </a>
        <div className="flex-grow-1 d-flex justify-content-center">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
            <button className="btn btn-outline-light" type="submit">
              Buscar
            </button>
          </form>
        </div>

        <div className="d-flex align-items-center gap-3">
          <a href="#" className="text-white" title="Iniciar sesión">
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

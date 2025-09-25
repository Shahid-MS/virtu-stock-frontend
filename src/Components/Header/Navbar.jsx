import "./navbar.css"

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid mx-3">
          {/* Left: Brand */}
          <a className="navbar-brand" href="#">
            <img
              src="./Images/logo-name.png"
              alt="Bootstrap"
              width="225"
              height="45"
            />
          </a>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar content */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Middle on lg, Left on small: Search Bar */}
            <div className="col-12 col-lg-6 col-sm-9 mx-lg-auto me-auto">
              <form className="d-flex mx-lg-auto" role="search">
                <input
                  className="form-control me-3"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-light" type="submit">
                  Search
                </button>
              </form>
            </div>

            {/* Right: User Icon */}
            <ul className="navbar-nav ms-lg-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <button className="btn btn-light">Login</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

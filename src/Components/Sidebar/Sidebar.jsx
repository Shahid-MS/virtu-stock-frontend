import "./sidebar.css";
import ipos from "../../IPOs/ipos";
const Sidebar = () => {
  return (
    <div className="col-4 col-lg-2 shadow-sm min-vh-100">
      <nav className="navbar">
        <ul class="navbar-nav mb-2 mx-4 mb-lg-0 fs-4">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              IPO
            </a>
            <ul class="dropdown-menu">
              {ipos.map((ipo) => (
                <li key={ipo.id}>
                  <a className="dropdown-item">
                    {ipo.name}
                  </a>
                </li>
              ))}
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Comparison
                </a>
              </li>
            </ul>
          </li>
        </ul>
       
      </nav>
    </div>
  );
};

export default Sidebar;

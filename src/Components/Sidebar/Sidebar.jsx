import "./sidebar.css";
import ipos from "../../IPOs/ipos";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="col-4 col-lg-2 shadow-sm">
      <nav className="navbar">
        <ul class="navbar-nav mb-2 mx-4 mb-lg-0 fs-5">
          <li class="nav-item">
            <Link class="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Open IPO
            </a>
            <ul class="dropdown-menu">
              {ipos.map((ipo) => (
                <li key={ipo.id}>
                  <Link className="dropdown-item" to={`/ipo/${ipo.id}`}>
                    {ipo.name}
                  </Link>
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

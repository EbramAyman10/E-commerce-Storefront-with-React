import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent px-3 py-2 mb-4  text-black">
      <div className="container-fluid d-flex justify-content-between align-items-center w-100">
        <div className="left-section">
          <Link className="navbar-brand text-black  fs-2 fw-bold" to="/">
            WEARLY
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div className="middle-section mx-auto">
            <ul className="navbar-nav ms-auto font-weight-bold d-flex flex-row gap-4 fs-5  text-black">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-warning"
                      : "nav-link  text-black"
                  }
                >
                  Shop
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/men"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-warning"
                      : "nav-link  text-black"
                  }
                >
                  Men
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/women"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-warning"
                      : "nav-link  text-black"
                  }
                >
                  Women
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/kids"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-warning"
                      : "nav-link  text-black"
                  }
                >
                  Kids
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/collections"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-warning"
                      : "nav-link  text-black"
                  }
                >
                  Collection
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="right-section">
            <button className="btn icon-button fs-5">
              <i className="fa-regular fa-circle-user icon"></i>
            </button>
            <button className="btn icon-button fs-5">
              <i className="fa-solid fa-magnifying-glass icon"></i>
            </button>
            <button className="btn icon-button fs-5">
              <i className="fa-solid fa-cart-shopping icon"></i>
            </button>
            <button className="btn icon-button fs-5">
              <i className="fa-solid fa-phone icon"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

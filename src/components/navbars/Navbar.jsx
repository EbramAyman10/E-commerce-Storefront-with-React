import { Link, NavLink, useLocation } from "react-router-dom";
import "./navbar.css";
import { useSelector } from "react-redux";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSearch = location.pathname === "/search";
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <nav
      className={`navbar navbar-expand-lg bg-transparent px-3 py-2  text-black ${
        isHome ? "fixed-top" : ""
      } ${isSearch ? "color-bg" : ""}`}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center w-100">
        {/* LEFT SECTION */}
        <div className="left-section">
          <Link className="navbar-brand text-black fw-bold" to="/">
            WEARLY
          </Link>
        </div>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CENTER LINKS */}
        <div
          className="collapse navbar-collapse navbar-collapse-resp"
          id="navbarNav"
        >
          <div className="middle-section mx-auto">
            <ul className="navbar-nav ms-auto flex-column flex-lg-row gap-4 text-black">
              <li className="nav-item">
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Shop
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/men"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Men
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/women"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Women
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/kids"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Kids
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink
                  to="/collections"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Collection
                </NavLink>
              </li> */}
            </ul>
          </div>
          <div className="right-section d-flex">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "icon-button active-icon" : "icon-button"
              }
            >
              <i className="fa-regular fa-circle-user icon"></i>
            </NavLink>

            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "icon-button active-icon" : "icon-button"
              }
            >
              <i className="fa-solid fa-magnifying-glass icon"></i>
            </NavLink>

            <NavLink
              to={isLoggedIn ? "/cart" : "/login"}
              className={({ isActive }) =>
                isLoggedIn
                  ? isActive
                    ? "icon-button active-icon"
                    : "icon-button"
                  : "icon-button"
              }
              onClick={
                isLoggedIn
                  ? () => {}
                  : () => alert("Login first to see your cart")
              }
            >
              <i className="fa-solid fa-cart-shopping icon"></i>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "icon-button active-icon" : "icon-button"
              }
            >
              <i className="fa-solid fa-phone icon"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

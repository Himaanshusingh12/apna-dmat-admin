import React from "react";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";

function Header({ onToggleSidebar }) {
  const handleLogout = () => {
    // console.log("Logging out...");

    localStorage.removeItem("adminToken");
    // console.log("Token after logout:", localStorage.getItem("adminToken"));

    window.location.href = "/";
  };
  return (
    <>
      <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
        <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-primary mb-0">
            <i className="fa fa-hashtag" />
          </h2>
        </a>
        <a
          href="#"
          className="sidebar-toggler flex-shrink-0"
          onClick={onToggleSidebar}
        >
          <i className="fa fa-bars" />
        </a>
        <div className="navbar-nav align-items-center ms-auto">
          <button onClick={handleLogout} className="btn btn-primary me-3">
            <i className="fa fa-sign-out-alt me-1"></i> Logout
          </button>

          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-bell me-lg-2" />
              <span className="d-none d-lg-inline-flex">Notificatin</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item">
                <h6 className="fw-normal mb-0">Profile updated</h6>
                <small>15 minutes ago</small>
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <h6 className="fw-normal mb-0">New user added</h6>
                <small>15 minutes ago</small>
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <h6 className="fw-normal mb-0">Password changed</h6>
                <small>15 minutes ago</small>
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item text-center">
                See all notifications
              </a>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                className="rounded-circle me-lg-2"
                src="img/user2.png"
                alt
                style={{ width: 40, height: 40 }}
              />
              <span className="d-none d-lg-inline-flex">John Doe</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item">
                My Profile
              </a>
              <a href="#" className="dropdown-item">
                Settings
              </a>
              <a href="#" className="dropdown-item">
                Log Out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

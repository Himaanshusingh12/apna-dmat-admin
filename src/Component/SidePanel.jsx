import React from "react";
import { NavLink } from "react-router-dom";

function SidePanel() {
  return (
    <>
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <NavLink to="/dashboard" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">Apna Dmat</h3>
          </NavLink>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src="img/user2.png"
                alt
                style={{ width: 40, height: 40 }}
              />
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Mayank Joshi</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <NavLink to="/dashboard" className="nav-item nav-link">
              <i className="fa fa-tachometer-alt me-2" />
              Dashboard
            </NavLink>

            <NavLink to="/popup-details" className="nav-item nav-link">
              <i className="fa fa-user me-2" />
              Popup Details
            </NavLink>

            <NavLink to="/users" className="nav-item nav-link">
              <i className="fa fa-user me-2" />
              Users
            </NavLink>

            <NavLink to="/account-setting" className="nav-item nav-link">
              <i className="fa fa-cog me-2" />
              Account Setting
            </NavLink>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-cog me-2" />
                Service
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/add-service" className="dropdown-item">
                  Add Service
                </NavLink>
                <NavLink to="/manage-service" className="dropdown-item">
                  Manage Service
                </NavLink>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-cog me-2" />
                Sub Service
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/add-subservice" className="dropdown-item">
                  Add Sub Service
                </NavLink>
                <NavLink to="/manage-subservice" className="dropdown-item">
                  Manage Sub Service
                </NavLink>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-cog me-2" />
                Service Details
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/add-servicedetails" className="dropdown-item">
                  Add Service Details
                </NavLink>
                <NavLink to="/manage-servicedetails" className="dropdown-item">
                  Manage Service Details
                </NavLink>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-blog me-2" />
                Blog
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/add-category" className="dropdown-item">
                  Add Category
                </NavLink>
                <NavLink to="/manage-blogcategory" className="dropdown-item">
                  Manage Category
                </NavLink>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-blog me-2" />
                Blog Details
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/add-blogdetails" className="dropdown-item">
                  Add Blog Details
                </NavLink>
                <NavLink to="/manage-blogdetails" className="dropdown-item">
                  Manage Blog Details
                </NavLink>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-sliders-h me-2" />
                Slider
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/add-slider" className="dropdown-item">
                  Add Slider
                </NavLink>
                <NavLink to="/manage-slider" className="dropdown-item">
                  Manage Slider
                </NavLink>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-comments me-2" />
                Testimonial
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/add-testimonial" className="dropdown-item">
                  Add Testimonial
                </NavLink>
                <NavLink to="/manage-testimonial" className="dropdown-item">
                  Manage Testimonial
                </NavLink>
              </div>
            </div>
            {/* <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-cog me-2" />
                Account Setting
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/account-setting" className="dropdown-item">
                  Add Setting
                </NavLink>
                <NavLink to="/manage-setting" className="dropdown-item">
                  Manage Setting
                </NavLink>
              </div>
            </div> */}
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-file-contract me-2" />
                Terms & Condition
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/add-terms&condition" className="dropdown-item">
                  Add Terms & Condition
                </NavLink>
                <NavLink to="/manage-terms&condition" className="dropdown-item">
                  Manage Terms & Condition
                </NavLink>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {/* <i className="fa fa-user-shield me-2" /> */}
                <i className="fa fa-shield-alt me-2" />
                Privacy & Policy
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/add-privacypolicy" className="dropdown-item">
                  Add Privacy & Policy
                </NavLink>
                <NavLink to="/manage-privacypolicy" className="dropdown-item">
                  Manage Privacy & Policy
                </NavLink>
              </div>
            </div>
            {/* <a href="widget.html" className="nav-item nav-link">
              <i className="fa fa-th me-2" />
              Widgets
            </a> */}
            {/* <a href="form.html" className="nav-item nav-link">
              <i className="fa fa-keyboard me-2" />
              Forms
            </a> */}
            {/* <a href="table.html" className="nav-item nav-link">
              <i className="fa fa-table me-2" />
              Tables
            </a> */}
            {/* <NavLink to="/account-setting" className="nav-item nav-link">
              <i className="fa fa-cog me-2" />
              Account Setting
            </NavLink> */}
            {/* <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle active"
                data-bs-toggle="dropdown"
              >
                <i className="far fa-file-alt me-2" />
                Pages
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="signin.html" className="dropdown-item">
                  Sign In
                </a>
                <a href="signup.html" className="dropdown-item">
                  Sign Up
                </a>
                <a href="404.html" className="dropdown-item active">
                  404 Error
                </a>
                <a href="blank.html" className="dropdown-item">
                  Blank Page
                </a>
              </div>
            </div> */}
          </div>
        </nav>
      </div>
    </>
  );
}

export default SidePanel;

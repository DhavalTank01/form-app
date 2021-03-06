import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ count }) => {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/form-app">
            Movies App
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " to="/form-app">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/form-app/movies">
                  movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/form-app/customers">
                  customers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/form-app/rentals">
                  rentals
                </NavLink>
              </li>
            </ul>
            <div className="d-flex gap-2">
              <Link
                className="btn btn-outline-primary"
                to="/form-app/signIn"
              >
                Sign In
              </Link>
              <Link
                className="btn btn-outline-success"
                to="/form-app/signUp"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

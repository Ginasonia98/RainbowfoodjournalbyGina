import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Navbar/Navbar.css";

const Navbar = () => {
  const name = localStorage.getItem("name");
  const renderLoginLogout = () => {
    if (localStorage.getItem("token") || localStorage.getItem("Email")) {
      const handleLogout = () => {
        axios({
          method: "get",
          url: `${BASE_URL}/api/v1/logout`,
          headers: {
            apiKey: `${API_KEY}`,
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        })
          .then((response) => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            window.location.href = "/";
          })
          .catch((error) => {
            console.error(error);
          });
      };
      return (
        <>
          <span>
            <ul className="navbar-nav me-auto  mb-lg-0 ">
              {localStorage.getItem("token") ? (
                <li className="nav-item dropdown">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    className="nav-link fw-bold text-white dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link
                        className="dropdown-item fw-bold text-dark bi-person-fill"
                        to="/profile-user"
                      >
                        My Profile
                      </Link>
                    </li>
                    {localStorage.getItem("role") === "admin" ? (
                      <li>
                        <Link
                          className="dropdown-item fw-bold text-dark bi bi-people"
                          to="/all-users"
                        >
                          All User
                        </Link>
                      </li>
                    ) : null}
                    <li>
                      <Link
                        className="dropdown-item fw-bold text-dark bi bi-box-arrow-right"
                        to="#"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item ">
                  <Link className="nav-link fw-bold text-white" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </span>
        </>
      );
    }
    return (
      <li className="nav-item">
        <a className="nav-link text-white" href="/Form">
          Login
        </a>
      </li>
    );
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-container">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse text-white "
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav w-100 justify-content-between">
              <li class="d-flex line">
                <div className="d-flex flex-column justify-content-center">
                  <Link to="/" class="text-white text-decoration-none">
                    Home
                  </Link>
                </div>
                {localStorage.getItem("role") === "admin" ? (
                  <div className="d-flex flex-column justify-content-center ms-4">
                    <Link
                      to="/foods"
                      className="text-white text-decoration-none"
                    >
                      Update Food
                    </Link>
                  </div>
                ) : null}
              </li>
              <li class="nav-item">{renderLoginLogout()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

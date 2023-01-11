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
          <div className="d-flex justify-content-center">
            <div className="ms-5 ">
              <button
                type="button"
                class="button-warningnnew dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="name2">{name}</div>
              </button>
              <ul class="dropdown-menu position-absolute ">
                <li>
                  <Link to="/profile-user" className="nav-link bi-person-fill">
                    <div className="my-profile">Profile Saya</div>
                  </Link>
                </li>
                {localStorage.getItem("role") === "admin" ? (
                  <li>
                    <Link to="/all-users" class="nav-link bi bi-people">
                      <div className="user-all">User</div>
                    </Link>
                  </li>
                ) : null}
                <li className="nav-item">
                  <Link
                    className="nav-link bi bi-box-arrow-right"
                    href="#"
                    onClick={handleLogout}
                  >
                    <div className="log-out">Keluar</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      );
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/Form">
          Login
        </a>
      </li>
    );
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-primary navbar-container">
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

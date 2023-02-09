import React from "react";
import "../Footer/footer.css";
import logo from "../../assets/CPLogo.webp";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <br />
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div>
              <Link className="navbar-brand d-flex align-items-center" to="/">
                <img src={logo} alt="logo" height="40" className="me-2" />
                <span className="fw-bold fs-2 logo-color">
                  Rainbow Food Journal
                </span>
              </Link>
              <p className="mb-30 mt-2 footer-desc text-white">
                Rainbow Food Journal is a website managed by Psalm The Royal
                Company.
              </p>
            </div>
          </div>
          <div className="col-xl-2 offset-xl-1 col-lg-2 col-md-6">
            <div className="">
              <h4 className="text-white">Contact</h4>
              <ul className="list-unstyled">
                <li>
                  <i className="fs-5 p-1 rounded bi bi-instagram text-white"></i>
                  <a
                    href="https://instagram.com/chikogina_?igshid=YmMyMTA2M2Y="
                    className="text-decoration-none text-white ms-1"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <i className="fs-5 p-1 rounded bi bi-linkedin text-white"></i>
                  <a
                    href="https://www.linkedin.com/in/ginatobing/"
                    className="text-decoration-none text-white ms-1"
                  >
                    Linkeidn
                  </a>
                </li>
                <li>
                  <i className="fs-5 p-1 rounded bi bi-github text-white"></i>
                  <a
                    href="https://github.com/Ginasonia98?tab=repositories"
                    className="text-decoration-none text-white ms-1"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6">
            <div>
              <h4 className="text-white">Website</h4>
              <ul className="list-unstyled">
                <li>
                  <i className="fs-5 p-1 rounded bi bi-film text-white"></i>
                  <a
                    href="https://chikomoviestreaming.netlify.app/"
                    className="text-decoration-none text-white ms-1"
                  >
                    Chiko Movie Streaming Web
                  </a>
                </li>
                <li>
                  <i className="fs-5 p-1 rounded bi bi-tv text-white"></i>
                  <a
                    href="https://psalm-tv-web-streaming.vercel.app/"
                    className="text-decoration-none text-white ms-1"
                  >
                    Psalm Tv
                  </a>
                </li>
                <li>
                  <i className="fs-5 p-1 rounded bi bi-airplane text-white"></i>
                  <a
                    href="https://ginasonia98.github.io/Travellinweb.github.io/"
                    className="text-decoration-none text-white ms-1"
                  >
                    Travvellin Web
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6">
            <div>
              <div>
                <label
                  for="Newsletter"
                  className="form-label text-white fw-bold"
                >
                  Subscribe To Our Newsletter
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
                <button className="button-50 mt-1">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <div className="copyright">
            <p className="me-1 text-white">
              &copy; All Rights Reserved. Made By
              <span className="text-decoration-none text-white ms-1">
                Gina Sonia Br Tobing
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

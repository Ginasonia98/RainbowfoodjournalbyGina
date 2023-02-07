import React from "react";
import "../About/About.css";
import about from "../../assets/about.webp";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <section
        className="container-fluid p-home p-responsive"
        style={{ backgroundColor: "#FCF9BE" }}
      >
        <div className="row align-items-center g-lg-5 g-md-4 g-4">
          <div className="col-lg-4 col-md-5 col-12 text-center">
            <img
              className="rounded-5 img-fluid img-about w-100"
              src={about}
              alt="about"
            />
          </div>
          <div className="col-lg-6 col-md-7 col-12">
            <h1
              className="titleo text-start"
              style={{ color: "#FD841F", marginLeft: "-10px" }}
            >
              Tentang Kita
            </h1>
            <div className="mt-3">
              <p className="about-lh fs-6">
                Rainbow Food Journal adalah Website yang menyediakan berbagai
                menu makanan khas nusantara yang tentunya dilengkapi dengan
                bahan-bahan untuk membuatnya.Selain itu kita juga bisa
                menambahkan menu masakan yang kita ketahui dan resepnya.
              </p>
            </div>
            <Link style={{ textDecoration: "none" }} to="#">
              <button
                type="button"
                className="btn btn-success shadow d-flex align-items-center p-3"
              >
                Explore Our Recipes
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

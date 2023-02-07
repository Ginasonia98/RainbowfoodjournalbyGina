import React from "react";
import "../Carousel/Carousel.css";

const Carousel = () => {
  return (
    <>
      <div id="heroSlider" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item text-center bg-cover vh-100 active slide-1">
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h6 className="text-white">
                    Selamat Datang Di Rainbow Food Journal
                  </h6>
                  <h1 className="display-1 my-3 fw-bold text-white">
                    Temukan Resep Makananmu Disini
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item text-center bg-cover vh-100 slide-2">
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h6 className="text-white">
                    Selamat Datang Di Rainbow Food Journal
                  </h6>
                  <h1 className="display-1 my-3 fw-bold text-white">
                    Kami Menyediakanmu Makanan Lezat & Bergizi
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroSlider"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroSlider"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;

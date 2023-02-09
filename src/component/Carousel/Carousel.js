import React from "react";
import "../Carousel/Carousel.css";

const Carousel = () => {
  return (
    <>
      <div id="heroSlider" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item text-center bg-cover vh-100 active slide-1">
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="box-shadow">
                <div className="row justify-content-center">
                  <h3 className="text-black fs-1">Grilled Steak</h3>
                  <p className="text-black">
                    Makanan yang dibuat dari daging sapi yang diolah bersama
                    racikan bumbu
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item text-center bg-cover vh-100 slide-2">
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="box-shadow">
                <div className="row justify-content-center">
                  <h3 className="text-black fs-1">
                    Cooked Noodles With Shrimps
                  </h3>
                  <p className="text-black">
                    Mie Goreng yang dipadukan dengan udang
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item text-center bg-cover vh-100 active slide-3">
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="box-shadow">
                <div className="row justify-content-center">
                  <h3 className="text-black fs-1">
                    Poached egg with vegetables and tomatoes
                  </h3>
                  <p className="text-black">Telur yang dipadukan sayuran</p>
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

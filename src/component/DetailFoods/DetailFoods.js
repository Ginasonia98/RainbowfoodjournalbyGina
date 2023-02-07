import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, API_KEY } from "../../Environment";
import "../DetailFoods/Detail.css";
import { Link } from "react-router-dom";
import { Foods } from "../Foods/Foods";

const DetailFoods = () => {
  const [AllFoods, setAllFoods] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods/${id}`,
      headers: {
        apiKey: `${API_KEY}`,
      },
    })
      .then((response) => {
        console.log("cek:", response);
        console.log("cek1:", response.data.data);
        setAllFoods(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <>
      <section className="container-fluid py-5">
        <div className="mx-auto food-detail">
          <h1 className="title text-center text-capitalize" style={{color:"#FD841F"}}>
            {AllFoods.name} details
          </h1>
          <div className="card my-3 shadow">
            <div className="card-body">
              <div className="row g-2">
                <div className="col-lg-4 col-md-4 col-sm-4">
                  <img
                    className="img-fluid m-0 img-food"
                    src={AllFoods.imageUrl}
                    alt={AllFoods.name}
                  />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8">
                  <h2 className="card-title text-center text-sm-start text-capitalize fs-4 mb-3">
                    {AllFoods.name}
                  </h2>
                  <div className="d-flex gap-2 mb-1">
                    <i className="bi bi-card-text"></i>
                    <p className="card-text">
                      <span className="fw-bold">Deskripsi: </span>
                      {AllFoods.description}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mb-1">
                    <i className="bi bi-card-checklist"></i>
                    <p className="card-text">
                      <span className="fw-bold">Bahan: </span>
                      {AllFoods &&
                        AllFoods.ingredients.map((m, index) => {
                          return (
                            <span key={index}>{(index ? ", " : "") + m}</span>
                          );
                        })}
                    </p>
                  </div>
                  <br />
                  <div className="star-rate d-flex justify-content-start ">
                    <small className="text-muted">
                      <i
                        className="fa-solid fa-heart m-1"
                        style={{ color: `red` }}
                      ></i>
                      {AllFoods.totalLikes}
                    </small>
                    <small className="text-muted">
                      <Link to={`/rating/${AllFoods.id}`}>
                        <i
                          className="fa-solid fa-star m-1"
                          style={{ color: `gold` }}
                        ></i>
                      </Link>
                      {AllFoods.rating}
                    </small>
                  </div>
                </div>
                <hr class="shortLine" />
                <div className="d-flex gap-2 mb-1">
                  <i className="bi bi-postcard"></i>
                  <p className="card-text">
                    <span className="fw-bold">Created at: </span>
                    {AllFoods.createdAt}
                  </p>
                </div>
                <div className="d-flex gap-2 mb-1">
                  <i className="bi bi-info-square-fill"></i>
                  <p className="card-text">
                    <span className="fw-bold">Updated at: </span>
                    {AllFoods.createdAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailFoods;

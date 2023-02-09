import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Foods/foods.css";
import "../Rating/Rating.css";

const Rating = () => {
  let { foodsID } = useParams();

  const [foods, setFoods] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods/${foodsID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${API_KEY}`,
      },
    })
      .then((res) => {
        console.log("cek data:", res);
        setFoods(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [foodsID]);

  const getRating = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/food-rating/${foodsID}`,
      headers: {
        apiKey: `${API_KEY}`,
      },
    })
      .then((res) => {
        console.log("cek rating:", res);
        setRating(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRating();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/rate-food/${foodsID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${API_KEY}`,
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    })
      .then((res) => {
        console.log(res);
        getRating();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      rating: "",
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.string().required("Required"),
      review: Yup.string().required("Required"),
    }),
  });
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "lighten",
        }}
      >
        <section className="container-fluid py-5">
          <div className="mx-auto food-detail">
            <h1
              className="title text-center text-capitalize fw-bold fs-2"
            >
              <div
                className="text-white textt"
                style={{ textDecoration: "underline" }}
              >
                Rating {foods && foods.name}
              </div>
            </h1>
            <div className="card my-3 shadow">
              <div className="card-body">
                <div className="row g-2">
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <img
                      src={foods && foods.imageUrl}
                      className="img-fluid m-0 img-food"
                      alt={foods && foods.name}
                    />
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <h2 className="card-title text-center text-sm-start text-capitalize fs-4 mb-3 fw-bold">
                      {foods && foods.name}
                    </h2>
                    <div className="d-flex gap-2 mb-1">
                      <i className="bi bi-card-text"></i>
                      <p className="card-text">
                        <span className="fw-bold">Deskripsi: </span>
                        {foods && foods.description}
                      </p>
                    </div>
                    <div className="d-flex gap-2 mb-1">
                      <i className="bi bi-card-checklist"></i>
                      <p className="card-text">
                        <span className="fw-bold">Bahan: </span>
                        {foods &&
                          foods.ingredients.map((m, index) => {
                            return (
                              <span key={index}>{(index ? ", " : "") + m}</span>
                            );
                          })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center" style={{ marginTop: "-35px" }}>
          <button
            type="button"
            className="btn btn-primary h-50"
            data-bs-toggle="modal"
            data-bs-target={`#rating${foods && foods.id}`}
          >
            <i class="bi bi-bookmark-star icon-button me-2"></i>
            Create Rating
          </button>
        </div>
        <div
          className="modal fade "
          id={`rating${foods && foods.id}`}
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md w-50">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close me-3"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  className="box-addFoods"
                  onSubmit={(e) => handleSubmit(e, foods.id)}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#FD841F",
                    }}
                  >
                    Create Rating
                  </div>
                  <div className="row gap-4">
                    <div className="col-md-6">
                      <label
                        for="inputName"
                        className="form-labelo"
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#FD841F",
                          marginLeft: "1px",
                        }}
                      >
                        Rating
                      </label>
                      <br />
                      <input
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="number"
                        className="add-input-s "
                        id="rating"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        for="inputName"
                        className="form-labelo"
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#FD841F",
                          marginLeft: "1px",
                        }}
                      >
                        Review
                      </label>
                      <br />
                      <input
                        value={formik.values.review}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="add-input-s"
                        id="review"
                      />
                    </div>
                    <div className="col-12">
                      <button className="create-rating">
                        <div className="create-text ">Create</div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="short-line-container">
          <div class="short-line"></div>
        </div>
        {rating &&
          rating.map((rate) => {
            return (
              <div key={rate.id}>
                <div className="col-6 list-group mt-2 mx-auto care">
                  <li className="d-flex justify-content-between align-items-start food-card-shadow list-group-item">
                    <div className="d-flex gap-3">
                      <img
                        src={rate.user.profilePictureUrl}
                        className="set-img"
                        alt={rate.user.name}
                      />
                      <div className="namee">
                        <div
                          style={{
                            fontWeight: "bold",
                            color: "#FD841F",
                          }}
                        >
                          <div className="fs-6">{rate.user.name}</div>
                        </div>
                        <div
                          style={{
                            fontWeight: "bold",
                            color: "#FD841F",
                          }}
                        >
                          <div className="fs-6">{rate.review}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <i
                        className="fa-solid fa-star m-1"
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#FD841F",
                        }}
                      ></i>
                      {rate.rating}
                    </div>
                  </li>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Rating;

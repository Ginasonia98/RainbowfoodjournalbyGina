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
      <div>
        <div className="card-r mt-5 mx-auto  shadow w-50">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={foods && foods.imageUrl}
                className="img-fluid  shadow"
                alt={foods && foods.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="card-name">{foods && foods.name}</div>
                <div className="d-flex gap-2 mt-4">
                  <i
                    class="bi bi-list"
                    style={{
                      color: "#FD841F",
                      fontSize: "20px",
                      marginLeft: "15px",
                    }}
                  ></i>
                  <div
                    className="text-desc"
                    style={{ fontSize: "16px", color: "#FD841F" }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Deskripsi:
                    </span>{" "}
                    {foods && foods.description}
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <i
                    className="bi bi-info-square"
                    style={{
                      fontSize: "20px",
                      color: "#FD841F",
                      marginLeft: "15px",
                    }}
                  ></i>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#FD841F",
                    }}
                  >
                    Bahan:
                    {foods &&
                      foods.ingredients.map((i, index) => {
                        return (
                          <span
                            style={{ fontWeight: "normal", fontSize: "16px" }}
                            key={index}
                          >
                            {(index ? ", " : " ") + i}
                          </span>
                        );
                      })}
                  </span>
                </div>
                <br />
                <p className="card-text">
                  <i
                    className="fa-solid fa-star ms-3"
                    style={{ color: `orange` }}
                  ></i>
                  {foods && foods.rating}.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn-create shadow fw-bold ms-5 "
            data-bs-toggle="modal"
            data-bs-target={`#rating${foods && foods.id}`}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Create Rating
            </div>
          </button>
        </div>
        <div
          className="modal fade h-50"
          id={`rating${foods && foods.id}`}
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
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
                        className="form-label"
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#FD841F",
                        }}
                      >
                        Rating
                      </label>
                      <input
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="number"
                        className="add-input-t"
                        id="rating"
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        for="inputName"
                        className="form-label"
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#FD841F",
                        }}
                      >
                        Review
                      </label>
                      <input
                        value={formik.values.review}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="add-input-t"
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

        {rating &&
          rating.map((rate) => {
            return (
              <div key={rate.id}>
                <div className="col-6 list-group mt-3 mx-auto mb-5 ">
                  <li className="d-flex justify-content-between align-items-start food-card shadow list-group-item">
                    <div className="d-flex gap-3">
                      <img
                        src={rate.user.profilePictureUrl}
                        className="set-img"
                        alt={rate.user.name}
                      />
                      <div className="namee">
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#FD841F",
                          }}
                        >
                          {rate.user.name}
                        </div>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: "bold",
                            color: "#FD841F",
                          }}
                        >
                          {rate.review}
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

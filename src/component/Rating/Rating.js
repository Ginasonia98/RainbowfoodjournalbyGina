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
        <div className="card-r mt-5 mx-auto  shadow ">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={foods && foods.imageUrl}
                className="img-fluid-shadow"
                alt={foods && foods.name}
              />
            </div>
            <br />
            <div className="col-md-8">
              <div className="card-body">
                <div className="card-name ">{foods && foods.name}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn-created shadow fw-bold ms-5  "
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
          className="modal fade w-100"
          id={`rating${foods && foods.id}`}
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
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

        {rating &&
          rating.map((rate) => {
            return (
              <div key={rate.id}>
                <div className="col-6 list-group mt-3 mx-auto mb-5 ">
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

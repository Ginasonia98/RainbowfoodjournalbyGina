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
        console.log('cek data:', res)
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
        console.log('cek rating:',res)
        setRating(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRating();
  }, [foodsID]);

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
        window.location.reload()
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
      <div className="box-container">
        <div
          style={{ padding: "120px", backgroundColor: "white", width: "20%" }}
        >
          <div className="card-new mb-5 mx-auto  shadow">
            <div className="row g-0">
              <div className="col-md-4">
                <div className="image-rate">
                  <img
                    src={foods && foods.imageUrl}
                    className="img-fluid  shadow"
                    alt={foods && foods.name}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-titles" style={{ fontSize: "26px" }}>
                    {foods && foods.name}
                  </h5>
                  <p className="text-desc" style={{ fontSize: "16px" }}>
                    <div className="descnew">
                      Desc:{foods && foods.description}
                    </div>
                  </p>
                  <div className="d-flex gap-2" style={{ marginTop: "-20px" }}>
                    <div className="ing-new">
                      Ingredients:
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
                    </div>
                  </div>
                  <div className="rate">
                    <p className="card-text">
                      <i
                        className="fa-solid fa-star m-1"
                        style={{ color: `gold` }}
                      ></i>
                      <div className="rates">{foods && foods.rating}</div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="create-ratingbutton">
            <div className="text-center">
              <button
                type="button"
                className="btn btn-warning  shadow "
                data-bs-toggle="modal"
                data-bs-target={`#rating${foods && foods.id}`}
              >
                <div className="create">Create Rating</div>
              </button>
            </div>
          </div>
          <div
            className="modal fade"
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
                    <div className="text-center">
                      <h2
                        style={{
                          color: "orange",
                          position: "relative",
                          right: "-30px",
                        }}
                      >
                        Create Rating
                      </h2>
                    </div>
                    <div
                      style={{ position: "relative", right: "40px" }}
                      className="row gap-4"
                    >
                      <div className="col-md-6">
                        <label for="inputNames" className="form-label">
                          <div className="rating-reviewtext">Rating</div>
                        </label>
                        <input
                          value={formik.values.rating}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="number"
                          className="add-inputx "
                          id="rating"
                        />
                      </div>
                      <div className="col-md-6">
                        <label for="inputName" className="form-label">
                          <div className="rating-reviewtext">Review</div>
                        </label>
                        <input
                          value={formik.values.review}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="add-inputx"
                          id="review"
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="button button-warning">
                          <div className="create-text">Create</div>
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
                <div className="card1 container-md mt-3" key={rate.id}>
                  <div className="col-6 list-group mx-auto  ">
                    <li className="d-flex justify-content-between food-card shadow list-group-item">
                      <div className="d-flex gap-3">
                        <div className="image-user">
                          <img
                            src={rate.user.profilePictureUrl}
                            className="set-img"
                            alt={rate.user.name}
                          />
                        </div>
                        <div className=" ">
                          <div className="fw-bold username">
                            {rate.user.name}
                          </div>
                          <div className="review">{rate.review}</div>
                        </div>
                      </div>
                      <div className="rate1">
                        <i
                          className="fa-solid fa-star m-1"
                          style={{ color: `gold` }}
                        ></i>
                        {rate.rating}
                      </div>
                    </li>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Rating;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Home/Home.css";
import { Link } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../Foods/foods.css";

export const Foods = () => {
  const [AllFoods, setAllFoods] = useState([]);
  const [savePicture, setSavePicture] = useState("");
  const [ingredients, setEditIngredients] = useState([""]);

  const handleRemoveEditIngredients = (index) => {
    const values = [...ingredients];
    setEditIngredients(values);
    if (index >= 1) {
      values.splice(index, 1);
    }
  };

  const handleCHangeEditIngredients = (index, value) => {
    const values = [...ingredients];
    values[index] = value;
    setEditIngredients(values);
  };

  const getAllFoods = () => {
    const headers = localStorage.getItem("token")
      ? {
          apiKey: `${API_KEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        }
      : { apiKey: `${API_KEY}` };
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods`,
      headers: headers,
    })
      .then((resp) => {
        console.log("cek:", resp);
        setAllFoods(resp.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, try reloading the page");
      });
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("apakah kamu ingin menghapus data ini?")) {
      axios({
        method: "delete",
        url: `${BASE_URL}/api/v1/delete-food/${id}`,
        headers: {
          apiKey: `${API_KEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      })
        .then((response) => {
          console.log("cek del:", response);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      ingredients: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
  });

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/update-food/${id}`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        name: values.name,
        description: values.description,
        imageUrl: savePicture,
        ingredients: ingredients,
      },
    })
      .then((response) => {
        alert("foods edit successful !!");
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="bg-food">
        <div className="container">
          <div className="row">
            <div className="d-flex">
              <Link className="btn btn-success fw-bold" to={`/add-foods`}>
                <div className="create-foods">Create Foods</div>
              </Link>
            </div>
            {AllFoods &&
              AllFoods.map((foods) => {
                return (
                  <>
                    {/* Data-All-Foods */}
                    <div className="col-sm-12 col-md-6 col-lg-3 mt-5 mb-5 d-flex align-self-stretch ">
                      <div className="bg-white">
                        <img
                          className="img"
                          src={foods.imageUrl}
                          alt="All Foods"
                        />
                        <div className="names">Nama Makanan: {foods.name}</div>
                        <div className="ingredients ">
                          Bahan Pembuatan: {foods.ingredients.join(", ")}
                        </div>
                        <hr class="shortLine" />
                        <div className="button-food">
                          <div className="d-flex gap-1 d-flex  justify-content-center position-relative  ">
                            <div>
                              <Link
                                onClick={() => handleDelete(foods.id)}
                                className="btn btn-primary"
                              >
                                Delete
                              </Link>
                            </div>
                            <div key={foods.id}>
                              <Link
                                className="btn btn-info justify-content-center"
                                to={`/detail-foods/${foods.id}`}
                              >
                                Detail
                              </Link>
                            </div>
                            <div>
                              <Link
                                className="btn btn-danger justify-content-center"
                                data-bs-toggle="modal"
                                data-bs-target={`#exampleModal-${foods.id}`}
                              >
                                Edit
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="modal fade"
                      id={`exampleModal-${foods.id}`}
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div
                            class="modal-body"
                            style={{
                              position: "relative",
                              left: "-40px",
                            }}
                          >
                            <form
                              className="box-addFoods"
                              onSubmit={(e) => handleSubmit(e, foods.id)}
                            >
                              <div className="col-md-6">
                                <label for="inputName" className="form-label">
                                  Food Name
                                </label>
                                <br />
                                <input
                                  value={formik.values.name}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  type="text"
                                  className="add-inputm"
                                  id="name"
                                />
                              </div>
                              {formik.touched.name && formik.errors.name ? (
                                <div>{formik.errors.name}</div>
                              ) : null}
                              <div className="col-md-6">
                                <label for="inputAge" className="form-label">
                                  Description
                                </label>
                                <br />
                                <input
                                  value={formik.values.description}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  type="text"
                                  className="add-inputm"
                                  id="description"
                                />
                              </div>
                              {formik.touched.description &&
                              formik.errors.description ? (
                                <div>{formik.errors.description}</div>
                              ) : null}
                              <div className="col-md-12">
                                <label className="form-label">
                                  Food Image Upload
                                </label>
                                <UploadImage
                                  clasName="upload"
                                  style={{ width: "380px" }}
                                  onChange={(value) => setSavePicture(value)}
                                />
                              </div>
                              {ingredients.map((ingredient, index) => {
                                return (
                                  <div className="col-md-6">
                                    <label
                                      for="inputIngredient"
                                      className="form-label"
                                    >
                                      Ingredients
                                    </label>
                                    <div className="d-flex gap-2">
                                      <input
                                        onBlur={formik.handleBlur}
                                        type="text"
                                        className="add-inputmx"
                                        id="ingredients"
                                        value={ingredient}
                                        onChange={(event) =>
                                          handleCHangeEditIngredients(
                                            index,
                                            event.target.value
                                          )
                                        }
                                      />
                                      <button
                                        className="btn btn-danger"
                                        style={{
                                          fontSize: "12px",
                                        }}
                                        onClick={() =>
                                          handleRemoveEditIngredients(index)
                                        }
                                        type="button"
                                      >
                                        <div className="delete-text">
                                          Delete
                                        </div>
                                      </button>
                                    </div>
                                    {formik.touched.ingredients &&
                                    formik.errors.ingredients ? (
                                      <div>{formik.errors.ingredients}</div>
                                    ) : null}
                                  </div>
                                );
                              })}
                              <div className="col-12">
                                <button
                                  type="submit"
                                  className="button-warnings "
                                >
                                  Edit Food
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

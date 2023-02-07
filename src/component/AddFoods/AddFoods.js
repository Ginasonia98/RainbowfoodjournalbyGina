import React from "react";
import "../AddFoods/AddFoods.css";
import { BASE_URL, API_KEY } from "../../Environment";
import * as Yup from "yup";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import axios from "axios";
import { useState } from "react";
import ImageForm from "../../component/ImageForm/ImageForm";

export const AddFoods = () => {
  const [uploadImage, setUploadImage] = useState("");

  const onSubmit = (values) => {
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/create-food`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        apiKey: `${API_KEY}`,
      },
      data: {
        name: values.name,
        description: values.description,
        imageUrl: uploadImage,
        ingredients: values.ingredients,
      },
    })
      .then((res) => {
        console.log(res);
        window.location.href = "/foods";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="row mb-3">
        <div className="col-lg-12">
          <label
            className="form-label fw-bold mb-1"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
          <input className="form-controlt" {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="text-danger">{meta.error}</div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="container-fluid background-add-food d-flex align-items-center py-5">
        <Formik
          initialValues={{
            name: "",
            description: "",
            ingredients: [""],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
          })}
          onSubmit={onSubmit}
        >
          <div className="card mx-auto shadow sign-up-card py-3 px-2">
            <div className="card-body">
              <h2 className=" text-center mb-4" style={{ color: "#FD841F" }}>
                {" "}
                Add Food{" "}
              </h2>
              <Form>
                <div
                  className="fw-bold foody "
                  style={{
                    color: "#FD841F",
                    width: "300px",
                    marginLeft: "-30px",
                  }}
                >
                  Nama Makanan
                </div>
                <InputText
                  name="name"
                  type="text "
                  placeholder="Nama Makanan"
                />
                <div
                  className="fw-bold foody "
                  style={{
                    color: "#FD841F",
                    width: "300px",
                    marginLeft: "-30px",
                  }}
                >
                  Deskripsi
                </div>
                <InputText
                  name="description "
                  type="text"
                  placeholder="Deskripsi"
                />
                <br />
                <ImageForm onChange={(value) => setUploadImage(value)} />
                <br />
                <div className="row mb-3">
                  <div className="col-lg-12">
                    <label
                      className="form-label fw-bold mb-1"
                      style={{ color: "#FD841F", width: "300px" }}
                    >
                      <div className="bahan">Bahan</div>
                    </label>
                    <FieldArray name="ingredients">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const { values } = form;
                        const { ingredients } = values;
                        return (
                          <div>
                            {ingredients.map((ingredient, index) => (
                              <div
                                key={index}
                                className="d-flex input-group mb-1"
                              >
                                <Field
                                  name={`ingredients[${index}]`}
                                  placeholder={`Bahan ${index + 1}`}
                                  className="form-controly"
                                />
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-success "
                                    onClick={() => remove(index)}
                                  >
                                    <i class="bi bi-trash3"></i>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-success "
                                  style={{
                                    backgroundColor: "#16FF00",
                                    border: "#16FF00",
                                  }}
                                  onClick={() => push("")}
                                >
                                  <i class="bi bi-plus"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Formik>
      </section>
    </>
  );
};

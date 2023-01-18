import React from "react";
import "../AddFoods/AddFoods.css";
import { BASE_URL, API_KEY } from "../../Environment";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import UploadImage from "../UploadImage/UploadImage";

export const AddFoods = () => {
  const [ingredients, setIngredients] = useState([""]);
  const [SavePicture, setSavePicture] = useState("");

  const handleAddIngredients = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleDeleteIngredients = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleChangeIngredients = (index, value) => {
    setIngredients((previous) => {
      const values = [...previous];
      values[index] = value;
      return values;
    });
  };

  const formAddFoods = useFormik({
    initialValues: {
      name: "",
      description: "",
      ingredients: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
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
          imageUrl: SavePicture,
          ingredients: ingredients,
        },
      })
        .then((res) => {
          console.log(res);
          window.location.href = "/foods";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <section className="container-fluid background-add-food d-flex align-items-center py-5">
        <form onSubmit={formAddFoods.handleSubmit}>
          <div className="card mx-auto shadow sign-up-card py-3 px-2 w-100">
            <div className="card-body">
              <input
                id="name"
                name="name"
                type="text"
                className="inputs mt-2 mb-3"
                onChange={formAddFoods.handleChange}
                onBlur={formAddFoods.handleBlur}
                value={formAddFoods.values.name}
                placeholder="nama"
              />
              {formAddFoods.touched.name && formAddFoods.errors.name ? (
                <div>{formAddFoods.errors.name}</div>
              ) : null}

              <div class="">
                <input
                  id="description"
                  name="description"
                  type="text"
                  className="inputs"
                  onChange={formAddFoods.handleChange}
                  onBlur={formAddFoods.handleBlur}
                  value={formAddFoods.values.description}
                  placeholder="deskripsi"
                />
              </div>

              <div>
                {ingredients.map((ingredient, index) => {
                  return (
                    <div
                      class="d-flex mt-3 mb-2 position-relative  "
                      key={index}
                    >
                      <input
                        id="ingredients"
                        name="ingredients"
                        type="text"
                        className="inputs"
                        onBlur={formAddFoods.handleBlur}
                        placeholder="bahan"
                        value={ingredient}
                        onChange={(event) =>
                          handleChangeIngredients(index, event.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="button-warningnewss "
                        onClick={() => handleAddIngredients()}
                      >
                        <div className="add">Add</div>
                      </button>

                      <button
                        type="button"
                        className="button-warningnews"
                        onClick={() => handleDeleteIngredients(index)}
                      >
                        <div className="add">Delete</div>
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="input-file">
                <UploadImage onChange={(value) => setSavePicture(value)} />
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

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
      <div className="bg-addFoods">
        <form onSubmit={formAddFoods.handleSubmit} className="box-addFoods">
          <div className="add">Add Foods</div>
          <div class="">
            <input
              id="name"
              name="name"
              type="text"
              className="add-input"
              onChange={formAddFoods.handleChange}
              onBlur={formAddFoods.handleBlur}
              value={formAddFoods.values.name}
              placeholder="nama"
            />
            {formAddFoods.touched.name && formAddFoods.errors.name ? (
              <div>{formAddFoods.errors.name}</div>
            ) : null}
          </div>

          <div class="">
            <input
              id="description"
              name="description"
              type="text"
              className="add-input"
              onChange={formAddFoods.handleChange}
              onBlur={formAddFoods.handleBlur}
              value={formAddFoods.values.description}
              placeholder="deskripsi"
            />
          </div>

          <div>
            {ingredients.map((ingredient, index) => {
              return (
                <div class="d-flex gap-2" key={index}>
                  <input
                    id="ingredients"
                    name="ingredients"
                    type="text"
                    className="add-input2"
                    onBlur={formAddFoods.handleBlur}
                    placeholder="bahan"
                    value={ingredient}
                    onChange={(event) =>
                      handleChangeIngredients(index, event.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="button-warningnews"
                    style={{ fontSize: "12px" }}
                    onClick={() => handleAddIngredients()}
                  >
                    <div className="add">Add</div>
                  </button>
                  <button
                    type="button"
                    className="button-warningnews"
                    style={{ fontSize: "12px" }}
                    onClick={() => handleDeleteIngredients(index)}
                  >
                    <div className="add">Delete</div>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="input-upload">
            <div className="input-file">
              <div>
                <UploadImage onChange={(value) => setSavePicture(value)} />
              </div>
            </div>
          </div>
          <button type="submit" class="button-warningnew">
            <div className="submit">Submit</div>
          </button>
        </form>
      </div>
    </>
  );
};

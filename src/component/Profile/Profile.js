import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import { Link } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../Profile/Profile.css";

const Profile = () => {
  const [Profile, setProfile] = useState("");
  const [savePicture, setSavePicture] = useState("");

  const getProfile = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/user`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    })
      .then((resp) => {
        console.log("cek22:", resp);
        setProfile(resp.data.user);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, Silahkan Refresh ");
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/update-profile`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        name: values.name,
        email: values.email,
        profilePictureUrl: savePicture,
        phoneNumber: values.phoneNumber,
        role: values.role,
      },
    })
      .then((response) => {
        console.log(response);
        axios({
          method: "post",
          url: `https://api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${
            Profile && Profile.id
          }`,
          data: {
            role: values.role,
          },
          headers: {
            apiKey: `${API_KEY}`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            console.log(response);
            localStorage.setItem("role", values.role);
            alert("Profil Berhasil Update!!");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
    }),
  });

  return (
    <>
      <div className="box-containerr">
        <div>
          <div className="carddd mx-auto  shadow">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={Profile.profilePictureUrl}
                  className="img-fluidr  shadow"
                  alt={Profile.name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="card-titler" style={{ fontSize: "26px" }}>
                    {Profile.name}
                  </div>
                  <div className="d-flex gap-2 mt-4">
                    <p className="text-desc" style={{ fontSize: "16px" }}>
                      <div className="emaile">Email : {Profile.email}</div>{" "}
                    </p>
                  </div>
                  <div className="d-flex gap-2" style={{ marginTop: "-20px" }}>
                    <p className="text-desc" style={{ fontSize: "16px" }}>
                      <div className="roless">Role : {Profile.role}</div>{" "}
                    </p>
                  </div>
                  <div className="d-flex gap-2" style={{ marginTop: "-20px" }}>
                    <p className="text-desc" style={{ fontSize: "16px" }}>
                      <div className="phone-number">
                        Phone Number : {Profile.phoneNumber}
                      </div>{" "}
                    </p>
                  </div>
                </div>
                <div >
                  <Link
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div className="text-center edit-profiletext" >
              Edit Profile
            </div>
            <div
              class="modal-body"
            >
              <form
                className="box-addFoods"
                onSubmit={(e) => handleSubmit(e, Profile.id)}
              >
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    User Name
                  </label>
                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="add-input-t"
                    id="name"
                  />
                </div>
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}

                <div className="col-md-6">
                  <label for="inputAge" className="form-label">
                    Email
                  </label>
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="add-input-t"
                    id="email"
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}

                <div className="col-md-12">
                  <label className="form-label">Food Image Upload</label>
                  <UploadImage
                    style={{ width: "380px" }}
                    onChange={(value) => setSavePicture(value)}
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputAge" className="form-label">
                    Phone Number
                  </label>
                  <input
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="add-input-t"
                    id="phoneNumber"
                  />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div>{formik.errors.phoneNumber}</div>
                ) : null}

                <div className="col-12">
                  <button type="submit" className="btn btn-success ">
                    Edit Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

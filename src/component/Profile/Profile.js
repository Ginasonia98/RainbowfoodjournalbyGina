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
        alert("Error, Silahkan Refresh Halaman");
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
            alert("Update Profile Berhasil !!");
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
      <section className="container-fluid py-5">
        <div className="mx-auto profile-detail">
          <h1
            className="title text-center"
            style={{ color: "#FF7000 ", fontSize: "30px" }}
          >
            My Profile
          </h1>
          <div className="card my-3 shadow">
            <div className="card-body">
              <div className="row g-2">
                <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center">
                  <img
                    src={Profile.profilePictureUrl}
                    className="img-fluid m-0 img-profile-page "
                    alt={Profile.name}
                  />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8">
                  <div
                    className="card-title text-center text-sm-start fs-4 mb-3"
                    style={{ color: "#FF7000 ", fontSize: "24px" }}
                  >
                    {Profile.name}
                  </div>
                  <div className="d-flex gap-2 mb-1 d-flex align-items-center">
                    <p className="text-desc" style={{ fontSize: "16px" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          color: "#FF7000 ",
                        }}
                      >
                        Email:
                      </span>{" "}
                      <div className="card-text" style={{ color: "#FF7000 " }}>
                        {Profile.email}
                      </div>
                    </p>
                  </div>
                  <br />
                  <div className="d-flex gap-2" style={{ marginTop: "-20px" }}>
                    <p className="text-desc" style={{ fontSize: "16px" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          color: "#FF7000 ",
                        }}
                      >
                        Role:
                      </span>{" "}
                      <div style={{ color: "#FF7000 " }}>{Profile.role}</div>
                    </p>
                  </div>
                  <br />
                  <div className="d-flex gap-2 mb-1 align-items-center">
                    <p className="card-text" style={{ fontSize: "16px" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          color: "#FF7000 ",
                        }}
                      >
                        Phone Number :
                      </span>{" "}
                      <div style={{ color: "#FF7000 " }}>
                        {Profile.phoneNumber}
                      </div>
                    </p>
                  </div>
                  <br />
                  <div style={{ marginLeft: "15px" }}>
                    <Link
                      className="btn btn-success"
                      style={{ fontSize: "0.75rem" }}
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
              <h3 className="mt-2 text-center" style={{ color: "#FF7000 " }}>
                Edit Profile
              </h3>
              <div class="modal-body" style={{ position: "relative" }}>
                <form
                  className="box-addFoods"
                  onSubmit={(e) => handleSubmit(e, Profile.id)}
                >
                  <div className="col-md-6">
                    <label for="inputName" className="form-labell ">
                      Nama Pengguna
                    </label>
                    <br />
                    <input
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      className="add-input-mp"
                      id="name"
                    />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                  <br />
                  <div className="col-md-6">
                    <label for="inputAge" className="form-labels">
                      Email
                    </label>
                    <br />
                    <input
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      className="add-input-mps"
                      id="email"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                  <br />
                  <div className="col-md-12">
                    <label className="form-labellll">Food Image Upload</label>
                    <UploadImage
                      style={{ width: "380px" }}
                      onChange={(value) => setSavePicture(value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label for="inputAge" className="form-labelllll">
                      Phone Number
                    </label>
                    <br />
                    <input
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      className="add-input-mp"
                      id="phoneNumber"
                    />
                  </div>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div>{formik.errors.phoneNumber}</div>
                  ) : null}
                  <br />
                  <div className="col-12 ms-5">
                    <button type="submit" className="btn btn-success">
                      Edit Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;

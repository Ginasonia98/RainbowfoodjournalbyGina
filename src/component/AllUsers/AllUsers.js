import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Home/Home.css";
import "../AllUsers/AllUsers.css";
import * as Yup from "yup";
import { useField, Formik, Form } from "formik";
import defaultImage from "../../assets/default.webp";

const AllUsers = () => {
  const [AllUsers, setAllUsers] = useState([]);

  const onImageError = (e) => {
    e.target.src = defaultImage;
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/all-user`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    })
      .then((resp) => {
        console.log("cek:", resp);
        setAllUsers(resp.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, silahkan refresh");
      });
  }, []);

  const handleSubmit = (values) => {
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/update-user-role/${values.id}`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        role: values.role,
      },
    })
      .then((response) => {
        console.log(response);
        alert("Update Peran User Berhasil!!");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Silahkan Pilih Peran");
      });
  };

  const SelectRole = ({ label, ...props }) => {
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
          <select className="form-select" {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="text-danger">{meta.error}</div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="container-fluid py-5 min-vh-100 ">
        <div className="title text-center text-decoration-underline">
          {" "}
          Semua Pengguna{" "}
        </div>
        <div className="row row-cols row-cols-md-3 row-cols-lg-5 g-4 mt-3 mx-lg-5 mx-4 ">
          {AllUsers &&
            AllUsers.map((users) => {
              return (
                <div className="card-group gy-0">
                  <div className="card shadow mt-4">
                    <div className="card-body d-flex flex-column p-2">
                      <img
                        className="img-card-profile mx-auto mb-2"
                        src={users.profilePictureUrl}
                        alt="All Foods"
                      />
                      <h5
                        className="card-title text-center fs-5 mb-3"
                        style={{
                          color: "#FF7000",
                          fontSize: "25px",
                        }}
                      >
                        {users.name}
                      </h5>
                      <div className="d-flex gap-2 d-flex align-items-center mt-auto">
                        <div
                          className="card-text font-12px text-truncate"
                          style={{
                            color: "#FF7000",
                            fontSize: "15px",
                          }}
                        >
                          Email :{users.email}
                        </div>
                      </div>
                      <div>
                        <div
                          className="d-flex gap-2 align-items-center"
                          style={{
                            color: "#FF7000",
                            fontSize: "15px",
                          }}
                        >
                          Phone: {users.phoneNumber}
                        </div>
                      </div>
                      <div
                        className="d-flex gap-2 align-items-center"
                        style={{
                          color: "#FF7000",
                          fontSize: "15px",
                        }}
                      >
                        <div className="user-email">Peran: {users.role}</div>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-center">
                        <button
                          type="button"
                          className="button-success"
                          data-bs-toggle="modal"
                          data-bs-target={`#userRole${users.id}`}
                        >
                          <div className="update-button w-100">Update</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id={`userRole${users.id}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Edit Role</h5>
                          <button
                            type="button"
                            className="btn-close me-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body p-4">
                          <div className="text-center mb-3">
                            <img
                              src={
                                users.profilePictureUrl
                                  ? users.profilePictureUrl
                                  : defaultImage
                              }
                              className="img-card-profile mx-auto mb-3"
                              alt={users.name}
                              onError={onImageError}
                            />
                            <h5 className="card-title text-center fs-5 mb-2">
                              {users.name}
                            </h5>
                            <div className="d-flex gap-2 align-items-center justify-content-center">
                              <i class="bi bi-envelope "></i>
                              <p className="card-text font-12px text-truncate">
                                {users.email}
                              </p>
                            </div>
                            <div className="d-flex gap-2 align-items-center justify-content-center">
                              <i className="bi bi-telephone "></i>
                              <p className="card-text font-12px">
                                {users.phoneNumber}
                              </p>
                            </div>
                          </div>
                          <Formik
                            initialValues={{
                              role: users.role,
                              id: users.id,
                            }}
                            enableReinitialize={true}
                            validationSchema={Yup.object({
                              role: Yup.string().oneOf(
                                ["admin", "user"],
                                "Select Role"
                              ),
                            })}
                            onSubmit={handleSubmit}
                          >
                            <Form>
                              <br />
                              <SelectRole label="Change Role" name="role">
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                              </SelectRole>
                              <div className="text-center mt-3">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Save Change
                                </button>
                              </div>
                            </Form>
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default AllUsers;

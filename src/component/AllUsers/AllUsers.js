import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Home/Home.css";
import "../AllUsers/AllUsers.css";
import * as Yup from "yup";
import { useFormik } from "formik";

const AllUsers = () => {
  const [AllUsers, setAllUsers] = useState([]);

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

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/update-user-role/${id}`,
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
      });
  };

  const formik = useFormik({
    initialValues: {
      role: "",
    },
    validationSchema: Yup.object({}),
  });

  return (
    <>
      <section className="container-fluid py-5 min-vh-100 ">
        <div className="title text-center">User</div>
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
                    class="modal fade"
                    id={`userRole${users.id}`}
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
                        <div class="modal-body p-4">
                          <form
                            className="box-addFood"
                            onSubmit={(e) => handleSubmit(e, users.id)}
                          >
                            <div className="col-md-6">
                              <label
                                for="inputAge"
                                className="form-label "
                                style={{
                                  color: "#FF7000",
                                }}
                              >
                                Role
                              </label>
                              <select
                                label="Role"
                                name="role"
                                className="add-input"
                                style={{
                                  color: "#FF7000",
                                }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                              >
                                <option value="">Select a Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                              </select>
                            </div>
                            <br />
                            <div className="col-12 ms-5">
                              <button type="submit" className="btn btn-success">
                                Edit Role
                              </button>
                            </div>
                          </form>
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

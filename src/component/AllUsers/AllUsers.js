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
        alert("Error, silahkan reload kembali");
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
      alert("Update Peran User Berhasil!!")
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
    validationSchema: Yup.object({

    }),
  });

  return (
    <>
      <div className="bg-food box-user" style={{ backgroundColor: "#fff" }}>
        <div className="title-user">User</div>
        <div className="container-rs">
          <div className="card-e">
            <div className="img-center">
              <div className="grid-img">
                {AllUsers &&
                  AllUsers.map((users) => {
                    return (
                      <>
                        <div className="box-foods">
                          <div className="box">
                            <img
                              className="img-all-foods"
                              src={users.profilePictureUrl}
                              alt="All Foods"
                            />
                            <div className="contentt">
                              <div className="user-id">User Id: {users.id}</div>
                              <div className="user-name">{users.name}</div>
                              <div className="user-email">
                                Email :{users.email}
                              </div>
                              <div className="user-email">
                                Peran: {users.role}
                              </div>
                              <div className="user-email">
                                Phone: {users.phoneNumber}
                              </div>
                              <button
                                type="button"
                                className="button-success"
                                data-bs-toggle="modal"
                                data-bs-target={`#userRole${users.id}`}
                              >
                                <div className="update-button">Update</div>
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
                              <div
                                class="modal-body"
                                style={{ position: "relative", left: "-40px" }}
                              >
                                <form
                                  className="box-addFood"
                                  onSubmit={(e) => handleSubmit(e, users.id)}
                                >
                                  <div className="col-md-6">
                                    <label
                                      for="inputAge"
                                      className="form-label"
                                    >
                                      Role
                                    </label>
                                    <select
                                      label="Role"
                                      name="role"
                                      className="add-input"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.role}
                                    >
                                      <option value="">Select a Role</option>
                                      <option value="admin">Admin</option>
                                      <option value="user">User</option>
                                    </select>
                                  </div>
                                  <div className="col-12">
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                    >
                                      Edit Role
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
        </div>
      </div>
    </>
  );
};

export default AllUsers;

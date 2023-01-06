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
        alert("Error, try reloading the page");
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
      alert("Update Role users Successful !!")
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
      <div className="bg-food box-all-users" style={{backgroundColor: '#e3f2fd'}}>
        <h3 className="title-h3">All Users</h3>
        <div className="img-center">
          <div className="grid-img">
            {AllUsers &&
              AllUsers.map((users) => {
                return (
                  <>
                    {/* Data-All-Users */}
                    <div className="box-foods" >
                      <div className="box">
                        <img
                          className="img-all-foods"
                          src={users.profilePictureUrl}
                          alt="All Foods"
                        />
                        <div className="content" style={{paddingTop:'.4rem'}}>
                          <p style={{ color: "rgb(157, 172, 24)" }}>
                            id: {users.id}
                          </p>
                          <h3 style={{ fontSize: "24px" }}>{users.name}</h3>
                          <p>{users.email}</p>
                          <p>Role: {users.role}</p>
                          <p>Phone: {users.phoneNumber}</p>
                          <button
                            type="button"
                            className="btn btn-success"
                            data-bs-toggle="modal"
                            data-bs-target={`#userRole${users.id}`}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* End-Data-All-users */}

                    {/* edit-role-users  */}
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
                              className="box-addFoods"
                              onSubmit={(e) => handleSubmit(e, users.id)}
                            >
                              <div className="col-md-6">
                                <label for="inputAge" className="form-label">
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
                    {/* end-edit-role-users  */}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;

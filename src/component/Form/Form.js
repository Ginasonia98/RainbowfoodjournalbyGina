import React, { useState } from "react";
import "../Form/Form.css";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BASE_URL, API_KEY } from "../../Environment";
import ImageForm from "../../component/ImageForm/ImageForm";


const Form = () => {
  const [classSignUp, setClassSignUp] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [password, setPasswordValue] = React.useState("password");
  const [passwordInput, setPasswordInput] = React.useState("");

  const handleSignUp = () => {
    setClassSignUp("sign-up-mode");
  };

  const onPasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };
  const toggle = () => {
    if (password === "password") {
      setPasswordValue("text");
      return;
    }
    setPasswordValue("password");
  };

  const handleSignIn = () => {
    setClassSignUp("");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values, e) => {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/register`,
        headers: {
          apiKey: `${API_KEY}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          role: values.role,
          phoneNumber: values.phoneNumber,
          imageUrl: uploadImage,
        },
      })
        .then((Response) => {
          alert("Registrasi Berhasil !!");
          window.location.reload();
        })
        .catch((e) => {
          alert("Registrasi Gagal !!");
        });
    },
  });

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values, e) => {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/login`,
        headers: {
          apiKey: `${API_KEY}`,
        },
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((Response) => {
          alert("Login Berhasil !!");
          const token = Response.data.token;
          localStorage.setItem("token", token);

          const role = Response.data.user.role;
          localStorage.setItem("role", role);

          const name = Response.data.user.name;
          localStorage.setItem("name", name);

          const email = values.email;
          localStorage.setItem("email", email);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          alert("Login Gagal! Silahkan Cek Email dan Password !!");
        });
    },
  });

  function showPassword() {
    toggle();
    return false;
  }

  return (
    <>
      <div className="body">
        <div class={`container-form ${classSignUp}`}>
          <div class="forms-container">
            <div
              class="signin-signup cark"
              style={{
                backgroundColor: "white",
              }}
            >
              {/* sign-in  */}
              <form onSubmit={formLogin.handleSubmit} class="sign-in-form">
                <h2 className="title">Sign In</h2>
                <img
                  className="image"
                  src="https://i.pinimg.com/564x/fb/7b/e0/fb7be013dddc99d1dd010723fd52312e.jpg"
                  alt="All Foods"
                />
                <div
                  className="fw-bold fs-10 text-container  "
                  style={{
                    color: "#FF7000 ",
                  }}
                >
                  Email
                </div>
                <div class="input-field">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formLogin.handleChange}
                    onBlur={formLogin.handleBlur}
                    value={formLogin.values.email}
                    placeholder="Email"
                  />
                  {formLogin.touched.email && formLogin.errors.email ? (
                    <div>{formLogin.errors.email}</div>
                  ) : null}
                </div>
                <div
                  className="fw-bold fs-10 text-container  "
                  style={{
                    color: "#FF7000 ",
                  }}
                >
                  Password
                </div>
                <div class="input-field">
                  <input
                    id="password"
                    name="password"
                    type={password}
                    onChange={formLogin.handleChange}
                    onBlur={formLogin.handleBlur}
                    value={formLogin.values.password}
                    placeholder="Password"
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                      border: "white",
                      marginLeft: "-15px",
                    }}
                    onClick={showPassword}
                  >
                    {password === "password" ? (
                      <svg
                        width="20"
                        height="17"
                        fill="black"
                        className="bi bi-eye-slash-fill  "
                        viewBox="0 0 16 16"
                      >
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="17"
                        fill="black"
                        className="bi bi-eye-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <br />
                <input type="submit" value="Login" class="button-login solid" />
                <br />
                <div style={{ color: "#FF7000", fontWeight: "bold" }}>
                  Tidak Memiliki Akun
                  <div
                    style={{ textDecoration: "underline" }}
                    onClick={() => handleSignUp()}
                  >
                    Silahkan Register
                  </div>
                </div>
              </form>
              {/* end-sign-in  */}

              {/* sign-up  */}
              <form onSubmit={formik.handleSubmit} class="sign-up-form mt-3">
                <h2 className="title">Sign Up</h2>
                <div
                  className="fw-bold fs-10 text-container  "
                  style={{
                    color: "#FF7000 ",
                  }}
                >
                  Username
                </div>
                <div class="input-field">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />

                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </div>
                <div
                  className="fw-bold mb-0 fs-10 text-container  "
                  style={{
                    color: "#FF7000 ",
                  }}
                >
                  Email
                </div>
                <div class="input-field">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />

                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div
                  className="fw-bold fs-10 text-container  "
                  style={{
                    color: "#FF7000 ",
                  }}
                >
                  Password
                </div>
                <div class="input-field">
                  <input
                    id="password"
                    name="password"
                    type={password}
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                      border: "white",
                      marginLeft: "10px",
                    }}
                    onClick={showPassword}
                  >
                    {password === "password" ? (
                      <svg
                        width="20"
                        height="17"
                        fill="black"
                        className="bi bi-eye-slash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="17"
                        fill="black"
                        className="bi bi-eye-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                    )}
                  </button>
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div
                  className="fw-bold fs-10 text-container  "
                  style={{
                    color: "#FF7000 ",
                  }}
                >
                  Confirm Password
                </div>
                <div class="input-field">
                  <input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type={password}
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordRepeat}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                      border: "white",
                      marginLeft: "-15px",
                      pointerEvents: "",
                    }}
                    onClick={showPassword}
                  >
                    {password === "password" ? (
                      <svg
                        width="20"
                        height="17"
                        fill="black"
                        className="bi bi-eye-slash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="17"
                        fill="black"
                        className="bi bi-eye-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                    )}
                  </button>
                  {formik.touched.passwordRepeat &&
                  formik.errors.passwordRepeat ? (
                    <div>{formik.errors.passwordRepeat}</div>
                  ) : null}
                </div>
                <div class="input-field">
                  <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                    component="select"
                    id="role"
                    name="role"
                    multiple={false}
                    className="select-container fw-bold fs-10  "
                  >
                    <option value="" className="fs-10">
                      Select a Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div
                  className="fw-bold fs-10 text-container  "
                  style={{
                    color: "#FF7000 ",
                  }}
                >
                  Phone Number
                </div>
                <div class="input-field">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                  />

                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div>{formik.errors.phoneNumber}</div>
                  ) : null}
                </div>
                <div className="input-file text-container  ">
                  <ImageForm onChange={(value) => setUploadImage(value)} />
                </div>
                <br />
                <button type="submit" class="button-login btn-primary ">
                  Submit
                </button>
                <div style={{ color: "#FD841F", fontWeight: "bold" }}>
                  Memiliki Akun
                  <div
                    style={{ textDecoration: "underline" }}
                    onClick={() => handleSignIn()}
                  >
                    Silahkan Login
                  </div>
                </div>
              </form>
              {/* end-sign-up  */}
            </div>
          </div>
          <div class="panels-container">
            <div class="panel right-panel">
              <div class="content"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;

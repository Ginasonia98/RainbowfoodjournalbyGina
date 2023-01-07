import React, { useState } from "react";
import "../Form/Form.css";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BASE_URL, API_KEY } from "../../Environment";
import UploadImage from "../UploadImage/UploadImage";

const Form = () => {
  const [classSignUp, setClassSignUp] = useState("");
  const [UploadFile, setUploadFile] = useState("");

  const handleSignUp = () => {
    setClassSignUp("sign-up-mode");
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
    onSubmit: (values) => {
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
          profilePictureUrl: UploadFile,
        },
      })
        .then((Response) => {
          alert("Registrasi Berhasil");
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
    onSubmit: (values) => {
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
          alert("Berhasil Masuk!!");
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
          alert("Gagal Masuk, Silahkan Cek Email Dan Password!!");
        });
    },
  });

  return (
    <>
      <div class={`container-form ${classSignUp}`}>
        <div class="forms-container">
          <div class="signin-signup">
            {/* sign-in  */}
            <form onSubmit={formLogin.handleSubmit} class="sign-in-form">
              <div class="titles">Masuk</div>
              <div class="input-field-new">
                <i class="fas fa-envelope"></i>
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                  value={formLogin.values.email}
                  placeholder="Email"
                  className="input-box-news"
                />
                {formLogin.touched.email && formLogin.errors.email ? (
                  <div>{formLogin.errors.email}</div>
                ) : null}
              </div>
              <div class="input-field-new">
                <i class="fas fa-lock"></i>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                  value={formLogin.values.password}
                  placeholder="Password"
                  className="input-box-news"
                />
              </div>
              <button type="submit" value="Login" class="button-login solid">
                <div>Submit</div>
              </button>
            </form>
            {/* end-sign-in  */}

            {/* sign-up  */}
            <form onSubmit={formik.handleSubmit} class="sign-up-form">
              <div class="titles">Daftar</div>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="input-box-newss"
                />

                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="input-box-newsss"
                />

                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>

              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="input-box-newss"
                />

                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>

              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordRepeat}
                  className="input-box-newsss"
                />

                {formik.touched.passwordRepeat &&
                formik.errors.passwordRepeat ? (
                  <div>{formik.errors.passwordRepeat}</div>
                ) : null}
              </div>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <select
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  component="select"
                  id="role"
                  name="role"
                  multiple={false}
                  class="select-field"
                >
                  <option value="">Select a Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div class="input-field">
                <i class="fa fa-phone"></i>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  className="input-box-newsss"
                />

                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div>{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
              <div
                className="input-uploadd"
              >
                <UploadImage onChange={(value) => setUploadFile(value)} />
              </div>
              <button type="submit" class="button-login btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Tidak Memiliki Akun</h3>
              <p>Silahkan Gabung Sekarang</p>
              <button
                class="button-login transparent"
                id="sign-up-btn"
                onClick={() => handleSignUp()}
              >
                Registrasi
              </button>
            </div>
          </div>

          <div class="panel right-panel">
            <div class="content">
              <h3>Masuk</h3>
              <p>Silahkan masuk dan lihat resep makanan khas nusantara</p>
              <button
                class="button-login transparent"
                id="sign-in-btn"
                onClick={() => handleSignIn()}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;

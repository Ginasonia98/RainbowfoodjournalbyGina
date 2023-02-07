import React, { useState } from "react";
import axios from "axios";
import "../ImageForm/ImageForm.css";

const ImageForm = ({ onChange }) => {
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleApi = () => {
    const url = "https://api-bootcamp.do.dibimbing.id/api/v1/upload-image";
    const formData = new FormData();
    formData.append("image", image);
    const headersApi = {
      headers: {
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
        Authorization: `Bearer${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, headersApi)
      .then((response) => {
        console.log(response);
        onChange(response.data.url);
        alert(`${response.data.message}`);
      })
      .catch((error) => {
        console.log(error);
        alert("Ukuran Image File Terlalu Besar!");
      });
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label
            className="form-label fw-bold mb-1 upimage"
            style={{ color: "#FF7000 " }}
          >
            Upload Image
          </label>
          <div className="d-flex">
            <input
              className="form-control file-upload "
              type="file"
              onChange={handleChange}
              accepts="image/*"
            />
            <button
              onClick={handleApi}
              className="btn btn-success btn-upload"
              style={{marginLeft:"-15px"}}
              encType="multipart/form-data"
              type="button"
            >
              <i class="bi bi-upload"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageForm;

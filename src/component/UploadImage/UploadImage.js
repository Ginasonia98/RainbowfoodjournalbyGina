import axios from "axios";
import { useRef, useState } from "react";
import { BASE_URL, API_KEY } from "../../Environment";
import "../UploadImage/UploadImage.css";

const UploadImage = ({onChange}) => {
 const [savePicture, setSavePicture] = useState("");

  const fileUpload = useRef(null);

  // upload image
  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setSavePicture(uploaded)
  }

  function uploadImage() {
    if(!savePicture) {
      alert('Silahkan Upload Ulang')
    } else {
      console.log(fileUpload.current.files[0]
        )
      let formData = new FormData();
      formData.append('image', savePicture);

    let configurasi = {
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data',
    },
  };

    axios.post(`${BASE_URL}/api/v1/upload-image`, 
    formData, configurasi
    )
    .then(function (response) {
      console.log(response);
      onChange(response.data.url)
    })
    .catch(function (error) {
      console.log(error);
    })
  
    .then((response) => {
      console.log(response)
      alert('Upload Gambar Berhasil !!')
    }).catch((error) => {
      console.error(error)
      alert('Upload Gambar Gagal!!')
    })
    }
  }

  return (
    <div className="upload ">
      <div className="">
        <input
          type="file"
          ref={fileUpload}
          id="formFile"
          onChange={handleUploadChange}
          accepts="image/*"
          className="input-upload mt-3"
        />
      </div>
      <br/>
      <button
        className="button-upload d-flex "
        type="button"
        id="inputGroupFileAddon04"
        onClick={uploadImage}
      >
        <div className="uploads">Upload</div>
      </button>
    </div>
  );
};

export default UploadImage;


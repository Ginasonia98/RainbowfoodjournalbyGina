import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Home/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [AllFoods, setAllFoods] = useState([]);

  const getAllFoods = () => {
    const headers = localStorage.getItem("token")
      ? {
          apiKey: `${API_KEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        }
      : { apiKey: `${API_KEY}` };
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods`,
      headers: headers,
    })
      .then((resp) => {
        console.log("cek:", resp);
        setAllFoods(resp.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, Silahkan Refresh Halaman");
      });
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  const handleLikes = (id, isLike) => {
    if (!isLike) {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/like`,
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          apiKey: `${API_KEY}`,
        },
      })
        .then((response) => {
          console.log(response);
          getAllFoods();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/unlike`,
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          apiKey: `${API_KEY}`,
        },
      })
        .then((response) => {
          console.log(response);
          getAllFoods();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div>
        <div className="home-section1">
          <div className="content1">
            <div className="welcome">Welcome To Rainbow Food Journal</div>
            <p style={{ fontWeight: "bold" }}>
              <div className="rainbow-explain">
                Rainbow Food Journal adalah Website yang menyediakan berbagai
                menu makanan khas nusantara yang tentunya dilengkapi dengan
                bahan-bahan untuk membuatnya.Selain itu kita juga bisa
                menambahkan menu masakan yang kita ketahui dan resepnya.
              </div>
            </p>
          </div>
        </div>
        <div className="bg-food">
          <div className="container">
            <div className="text-white fs-1 font-weight-bold py-3">Makanan</div>
            <div className="row">
              {AllFoods &&
                AllFoods.map((foods) => {
                  return (
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4 d-flex align-self-stretch">
                      <div className="bg-white">
                        <div className="image-card">
                          <img
                            className="w-100"
                            src={foods.imageUrl}
                            alt="All Foods"
                          />
                        </div>
                        <div className="content p-4">
                          <div className="mb-5">
                            <div className="name fs-5">{foods.name}</div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex justify-content-center">
                              <div className="d-flex flex-column justify-content-center">
                                <i
                                  className="fa-solid fa-heart"
                                  onClick={() =>
                                    handleLikes(foods.id, foods.isLike)
                                  }
                                  on
                                  style={{
                                    color: `${foods.isLike ? "pink" : "red"}`,
                                    cursor: "pointer",
                                    fontSize: "25px",
                                  }}
                                ></i>
                              </div>
                              <div
                                style={{
                                  position: "relative",
                                  fontSize: "20px",
                                }}
                                className="d-flex flex-column justify-content-center ms-1"
                              >
                                {foods.totalLikes}
                              </div>
                              <Link
                                className="d-flex rating set-rating"
                                to={`/rating/${foods.id}`}
                              >
                                <div className="d-flex flex-column justify-content-center">
                                  <i
                                    class="fa-solid fa-star"
                                    style={{
                                      color: "#FF7000",
                                      fontSize: "25px",
                                    }}
                                  ></i>
                                </div>
                                <div
                                  style={{
                                    position: "relative",
                                    fontSize: "20px",
                                  }}
                                  className="d-flex flex-column justify-content-center ms-1"
                                >
                                  {foods.rating}
                                </div>
                              </Link>
                            </div>
                            <div className="d-flex justify-content-center gap-2">
                              <div key={foods.id}>
                                <Link
                                  className="btn-detail"
                                  to={`/detail-foods/${foods.id}`}
                                >
                                  Detail
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

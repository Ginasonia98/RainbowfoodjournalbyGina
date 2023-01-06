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
        alert("Error, try reloading the page");
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
      <div className="container1">
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
        <div className=" bg-food">
          <div className="title-foods px-2 py-4">All Foods</div>
          <div className="row">
            <div className="img-center">
              <div className="grid-img">
                {AllFoods &&
                  AllFoods.map((foods) => {
                    return (
                      <>
                        <div className="food-wrapper rounded-0">
                          <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                            <img
                              className="food-image rounded-0 w-200 "
                              src={foods.imageUrl}
                              alt="All Foods"
                            />
                            <div className="content">
                              <h2 style={{ marginBottom: "30px" }}>
                                <div className="name pb-2 fs-5">
                                  {foods.name}
                                </div>
                              </h2>
                              <div className="d-flex justify-content-center heart">
                                <i
                                  className="fa-solid fa-heart"
                                  onClick={() =>
                                    handleLikes(foods.id, foods.isLike)
                                  }
                                  on
                                  style={{
                                    color: `${foods.isLike ? "pink" : "gray"}`,
                                    cursor: "pointer",
                                    fontSize: "25px",
                                  }}
                                ></i>
                                <p
                                  style={{
                                    position: "relative",
                                    bottom: "2px",
                                    fontSize: "20px",
                                  }}
                                >
                                  {foods.totalLikes}
                                </p>
                                <Link
                                  className="d-flex rating set-rating"
                                  to={`/rating/${foods.id}`}
                                >
                                  <i
                                    class="fa-solid fa-star"
                                    style={{
                                      color: "#FF7000",
                                      fontSize: "25px",
                                    }}
                                  ></i>
                                  <p
                                    style={{
                                      position: "relative",
                                      bottom: "2px",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {foods.rating}
                                  </p>
                                </Link>
                              </div>
                              <div className="d-flex justify-content-center gap-2 mt-2">
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

export default Home;

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, API_KEY } from "../../Environment";
import "../DetailFoods/Detail.css";
import { Link } from "react-router-dom";

const DetailFoods = () => {
  const [AllFoods, setAllFoods] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods/${id}`,
      headers: {
        apiKey: `${API_KEY}`,
      },
    })
      .then((response) => {
        console.log("cek:", response);
        console.log("cek1:", response.data.data);
        setAllFoods(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <>
      <div>
        <div className="bg-food">
          <div className="container">
            <div className="row">
              <div className="car col-sm-12 col-md-6 col-lg-3 mb-4 w-50">
                <div className="bg-white">
                  <div className="image-card">
                    <img
                      className="w-100"
                      src={AllFoods.imageUrl}
                      alt={AllFoods.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <br />
                      <div className="named">{AllFoods.name}</div>
                      <br />
                      <div className="descr">
                        Deskripsi :{AllFoods.description}
                      </div>
                      <div className="ingred">
                        Bahan :
                        {AllFoods &&
                          AllFoods.ingredients.map((m, index) => {
                            return (
                              <span className="i" key={index}>
                                {(index ? ", " : " ") + m}
                              </span>
                            );
                          })}
                      </div>
                      <br />
                      <div className="star-rate d-flex justify-content-start ms-3">
                        <small className="text-muted">
                          <i
                            className="fa-solid fa-heart m-1"
                            style={{ color: `red` }}
                          ></i>
                          {AllFoods.totalLikes}
                        </small>
                        <small className="text-muted">
                          <Link to={`/rating/${AllFoods.id}`}>
                            <i
                              className="fa-solid fa-star m-1"
                              style={{ color: `gold` }}
                            ></i>
                          </Link>
                          {AllFoods.rating}
                        </small>
                      </div>
                    </div>
                  </div>
                  <hr class="shortLine" />
                  <div className="d-flex justify-content-center">
                    <div className="created">
                      {" "}
                      Created At: {AllFoods.createdAt}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="updated">
                      {" "}
                      Update At: {AllFoods.createdAt}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailFoods;

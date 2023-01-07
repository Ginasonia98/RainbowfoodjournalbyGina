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
      <div className="box-container1">
        <div>
          <div className="card-newee  mx-auto  shadow">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={AllFoods.imageUrl}
                  className="img-fluid-new shadow"
                  alt={AllFoods.name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <br />
                  <div className="card-titlee" style={{ fontSize: "26px" }}>
                    {AllFoods.name}
                  </div>
                  <br />
                  <p className="text-desc" style={{ fontSize: "16px" }}>
                    <div className="desc">Desc:{AllFoods.description}</div>
                  </p>
                  <div className="d-flex " style={{ marginTop: "-20px" }}>
                    <div className="ingredient">
                      Ingredients:
                      {AllFoods &&
                        AllFoods.ingredients.map((m, index) => {
                          return (
                            <span
                              style={{ fontWeight: "normal", fontSize: "16px" }}
                              key={index}
                            >
                              {(index ? ", " : " ") + m}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                  <br />
                  <div className="star-rate">
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
                      <div className="all-rating">{AllFoods.rating}</div>
                    </small>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div
                  className="d-flex gap-2"
                  style={{
                    marginTop: "0.2rem",
                    marginLeft: "0.1rem",
                    color: "#FD841F",
                  }}
                >
                  <div className="text-descc" style={{ fontSize: "16px" }}>
                    <div className="created-updatedf">Created At:</div>{" "}
                    <div className="update">{AllFoods.createdAt}</div>
                  </div>
                </div>
                <div
                  className="d-flex "
                  style={{
                    marginTop: "0.5rem",
                    marginLeft: "0rem",
                    color: "#FD841F",
                  }}
                >
                  <div className="text-descc" style={{ fontSize: "16px" }}>
                    <div className="created-updatedf">Updated At:</div>{" "}
                    <div className="update">{AllFoods.createdAt}</div>
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

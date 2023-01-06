import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from "../../Environment";
import { Link } from "react-router-dom";
import "../MyFavorite/MyFavorite.css";

export const MyFavorite = () => {
  const [MyFavorite, setMyFavorite] = useState();

  const getLikeFoods = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/like-foods`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${API_KEY}`,
      },
    })
      .then((res) => {
        console.log('cek res:', res)
        setMyFavorite(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getLikeFoods();
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
          getLikeFoods();
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
          getLikeFoods();
        })
        .catch((error) => {
          console.error(error);
        });
    }  
  };

  return (
    <>
    <section>
      <div className="bg-food" style={{backgroundColor:'#e3f2fd'}}>
        <h2 className="mt-5 fw-bold text-center" style={{color: '#0d6efd'}}>My Favorite</h2>
        <div className="img-center">
          <div className="grid-img">
          {MyFavorite &&
            MyFavorite.map((liked) => {
              return (
                <div className="card-myFavorite" key={liked.id}>
                  <img
                      src={liked.imageUrl}
                      className="mt-3 card-img-top mx-auto"
                      alt={liked.name}
                    />
                  <div className="card-body-myFavorite">
                    
                    <div className="card-body">
                      <h5 className="card-title text-center">{liked.name}</h5>
                      <div className="d-flex gap-2 mt-2" >
                        <i class="bi bi-card-list" style={{color: '#0d6efd', fontSize:'16px'}}></i>
                        <p className="text-desc"><span style={{fontWeight:'bold'}}>Desc:</span> {liked.description}</p>
                      </div>           
                      <div className="d-flex gap-2" style={{marginTop:'-20px'}}>
                        <i className="bi bi-card-checklist" style={{color: '#0d6efd', fontSize:'16px'}}>                     
                        </i>
                        <p style={{fontSize: '12px', fontWeight:'bold'}}>Ingredients: 
                         {liked.ingredients.map((ingredient, index) => {
                            return (
                              <span className="text-ingredients" key={index}>{(index ? ", " : " ") + ingredient}</span>
                            );
                        })}
                        </p>
                      </div>
                    </div>
                    <div className="" style={{borderTop:'1px solid #9b9fb3', width:'100%'}}>
                      <small className="text-muted">
                        <Link to={`/rating/${liked.id}`}>
                          <i
                            className="fa-solid fa-star m-1"
                            style={{ color: `gold` }}
                          ></i>
                        </Link>
                        {liked.rating}
                      </small>
                      <small className="text-muted">
                        <i
                          className="fa-solid fa-heart m-1"
                          style={{ color: `${liked.isLike ? "red" : ""}` }}
                          onClick={() => handleLikes(liked.id, liked.isLike)}
                        ></i>
                        {liked.totalLikes}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
        </div>
      </div>
    </section>
    </>
  );
};

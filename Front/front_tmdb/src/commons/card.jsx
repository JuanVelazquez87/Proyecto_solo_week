import React from "react";
import { Link, useLocation } from "react-router-dom";

const Card = ({ tvShow, movie, chosen }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";
  const Url = useLocation();

  const type = Url.pathname.split("/")[1];
  let data;

  if (type === "movie") {
    data = movie;
  } else if (type === "tv") {
    data = tvShow;
  } else if (type === "search") {
    data = chosen;
  }

  return (
    <div>
      <Link to={`/${type}`}>
        <button type="button" class="btn btn-outline-secondary">
          VOLVER
        </button>
      </Link>

      <div class="card mb-3">
        <img
          src={`${IMAGE_PATH + data.backdrop_path}`}
          class="card-img-top"
        ></img>
        <div class="card-body">
          <h5 class="card-title">{data.title || data.name}</h5>
          <p class="card-text">{data.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import { Link, useLocation } from "react-router-dom";

const StreamColections = ({
  tvColections,
  movies,
  handleSelect,
  searchColections,
}) => {
  //datos de la API:
  const API_URL = "https://api.themoviedb.org/3/";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

  const Url = useLocation();

  const type = Url.pathname.slice(1);
  let colection;

  console.log("seachCOLLECTIONS en streams", searchColections);
  if (type === "movie") {
    colection = movies;
  } else if (type === "tv") {
    colection = tvColections;
  } else if (type === "search") {
    colection = searchColections;
  }
  // Estados y peticiones

  return (
    <div className="container mt-3">
      <div className="row">
        {colection.map((item, i) => (
          <div
            key={i}
            onClick={() => handleSelect(item)}
            className="col-md-4 mb-3"
          >
            <Link to={`${item.id}`}>
              <img
                src={`${IMAGE_PATH + item.poster_path}`}
                height={600}
                width="100%"
              ></img>
              <h4 className="text-center">{item.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamColections;

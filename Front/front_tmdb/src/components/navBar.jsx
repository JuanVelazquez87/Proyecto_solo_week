import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setSearchColections, user, setUser }) => {
  console.log("USER EN HOME >>", user);
  const API_KEY = "be677370ffe45f2acf32f2da2e142c90";
  const API_URL = "https://api.themoviedb.org/3/";
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/search");
    axios
      .get(`${API_URL}/search/multi`, {
        params: {
          api_key: API_KEY,

          query: searchContent,
        },
      })
      .then((result) => {
        setSearchColections(result.data.results);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:8080/logout", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data);
        setUser({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar bg-body-tertiary custom-nav">
      <div className="container-fluid">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="titulo">Strem-Dream</h1>
        </Link>
        <div style={{ display: "flex" }} className="streamsButtons">
          <Link style={{ textDecoration: "none" }} to="movie">
            <h3
              style={{
                color: "gold",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              Movies
            </h3>
          </Link>
          <Link style={{ textDecoration: "none" }} to="tv">
            <h3
              style={{
                textDecoration: "none",
                color: "gold",
                marginLeft: "20px",
              }}
            >
              Tv.Content
            </h3>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="d-flex ml-auto" role="search">
          <input
            onChange={(e) => setSearchContent(e.target.value)}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>

          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div
          style={{ display: "flex", paddingRight: "20px" }}
          className="UserButtons"
        >
          {!user.name ? (
            <Link to="login">
              <button style={{ margin: 8 }} className="btn btn-outline-success">
                Log in
              </button>
            </Link>
          ) : (
            <button className="btn btn-danger" onClick={handleClick}>
              Log out
            </button>
          )}
          {!user.name ? (
            <Link to="singup">
              <button style={{ margin: 8 }} className="btn btn-danger">
                Register
              </button>
            </Link>
          ) : (
            <h2
              style={{
                padding: 8,
                margin: 8,
                color: "white",
                border: "2px solid white",
                borderRadius: 100,
              }}
            >{`${user.name}`}</h2>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

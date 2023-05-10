import React from "react";
import axios from "axios";
import Navbar from "./components/navBar";
import Singup from "./components/Singup";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Card from "./commons/card";
import StreamColections from "./components/StreamColections";
import Home from "./components/home";
import Login from "./components/login";
function App() {
  const API_KEY = "be677370ffe45f2acf32f2da2e142c90";
  const API_URL = "https://api.themoviedb.org/3/";

  //ESTADOS:

  const [movies, setMovies] = React.useState([]);
  const [movie, setMovie] = React.useState({});

  const [tvColections, setTvColections] = React.useState([]);
  const [tvShow, SetTvShow] = React.useState({});

  //Estado de las busquedas

  const [searchColections, setSearchColections] = React.useState([]);
  const [chosen, setChosen] = React.useState({});

  console.log("CHOSEN >> ", chosen);

  //obtener todas las movies
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      .then((result) => {
        setMovies(result.data.results);
      })
      .catch((err) => console.log(err));
  }, []);
  //Obtrner toda la coleccion de TV
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`)
      .then((result) => {
        setTvColections(result.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  //OBTENER UNA MOVIE EN ESPESIFICO
  useEffect(() => {
    axios
      .get(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}&language=en-US`)
      .then((result) => setMovie(result.data))
      .catch((err) => console.log(err));
  }, [movie.id]);
  //OBTENER UN programa de tv EN ESPESIFICO
  useEffect(() => {
    axios
      .get(`${API_URL}/tv/${tvShow.id}?api_key=${API_KEY}&language=en-US`)
      .then((result) => SetTvShow(result.data))
      .catch((err) => console.log(err));
  }, [tvShow.id]);

  return (
    <div>
      <Navbar setSearchColections={setSearchColections} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movie"
          element={<StreamColections handleSelect={setMovie} movies={movies} />}
        />
        <Route
          path="/tv"
          element={
            <StreamColections
              handleSelect={SetTvShow}
              tvColections={tvColections}
            />
          }
        />
        <Route
          path="/search"
          element={
            <StreamColections
              handleSelect={setChosen}
              searchColections={searchColections}
            />
          }
        />
        <Route path="movie/:id" element={<Card movie={movie} />} />
        <Route path="tv/:id" element={<Card tvShow={tvShow} />} />
        <Route path="search/:id" element={<Card chosen={chosen} />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

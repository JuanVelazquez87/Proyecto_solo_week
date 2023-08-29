import axios from "axios";
import { setAllContent, setContentDetails } from "../slices/contentSlice";

//const apiKey = import.meta.env.VITE_TMDB_API_KEY;
//const apiUrl = import.meta.env.VITE_TMDB_API_URL;

export const fetchAllMovies = async (dispatch) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=be677370ffe45f2acf32f2da2e142c90"
    );
    dispatch(setAllContent(response.data.results));
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllTvContent = async (dispatch) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=be677370ffe45f2acf32f2da2e142c90"
    );
    dispatch(setAllContent(response.data.results));
  } catch (err) {
    console.log(err);
  }
};

export const fetchSearchContent = async (dispatch, searchTerm) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/multi",
      {
        params: {
          api_key: "be677370ffe45f2acf32f2da2e142c90",

          query: searchTerm,
        },
      }
    );

    dispatch(setAllContent(response.data.results));
  } catch (err) {
    console.log(err);
  }
};

export const fetchContentDetail = async (dispatch, id, media_type) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}`,
      {
        params: {
          api_key: "be677370ffe45f2acf32f2da2e142c90",
          language: "en-US",
        },
      }
    );
    console.log("lo que le mando al setcontentdetails >> ", response.data);
    dispatch(setContentDetails(response.data));
  } catch (err) {
    console.log(err);
  }
};

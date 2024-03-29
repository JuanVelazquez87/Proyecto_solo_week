import axios from "axios";
import { setAllContent, setContentDetails } from "../slices/contentSlice";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;
const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const fetchAllMovies = async (dispatch) => {
  try {
    const response = await axios.get(
      `${apiUrl}trending/movie/day?api_key=${apiKey}`
    );
    dispatch(setAllContent(response.data.results));
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllTvContent = async (dispatch) => {
  try {
    const response = await axios.get(
      `${apiUrl}trending/tv/day?api_key=${apiKey}`
    );

    dispatch(setAllContent(response.data.results));
  } catch (err) {
    console.log(err);
  }
};

export const fetchSearchContent = async (dispatch, searchTerm) => {
  try {
    const response = await axios.get(`${apiUrl}search/multi`, {
      params: {
        api_key: apiKey,

        query: searchTerm,
      },
    });

    dispatch(setAllContent(response.data.results));
  } catch (err) {
    console.log(err);
  }
};

export const fetchContentDetail = async (dispatch, id, media_type) => {
  try {
    const response = await axios.get(`${apiUrl}${media_type}/${id}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    console.log("en contentdetails", response.data);
    dispatch(setContentDetails(response.data));
  } catch (err) {
    console.log(err);
  }
};

import axios from "axios";

import { setFavorites, setUser } from "../slices/userSlice";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;
const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const signupAxios = async (sendData) => {
  try {
    const response = await axios.post(`${serverUrl}/user/signup`, sendData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const signinAxios = async (sendData, dispatch) => {
  try {
    const response = await axios.post(`${serverUrl}/user/login`, sendData, {
      withCredentials: true,
    });
    console.log("response.data", response.data);
    const { payload, token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      dispatch(setUser(payload));
      return "ok";
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserData = async (token, dispatch) => {
  try {
    const userResponse = await axios.get(
      `${serverUrl}/user/me`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (userResponse) {
      dispatch(setUser(userResponse.data));
    }
  } catch (err) {
    console.log("Authorization error : ", err);
  }
};

export const addToFavorites = async (
  token,
  contentId,
  media_type,
  dispatch
) => {
  try {
    const response = await axios.post(
      `${serverUrl}/user/favorites/add/${contentId}`,
      { data: { contentId, media_type } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = response.data.user;
    console.log("user en addFavorites >> ", user);
    dispatch(setUser(user));
  } catch (error) {
    console.log(error);
  }
};

export const removeFromFavorites = async (token, contentId, dispatch) => {
  try {
    const response = await axios.delete(
      `${serverUrl}/user/favorites/remove/${contentId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await dispatch(setUser(response.data.user));
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllFavorites = async (array, dispatch) => {
  try {
    const favoritePromises = await array.map((favorite) => {
      return axios.get(
        `${apiUrl}${favorite.media_type}/${favorite.contentId}`,
        {
          params: {
            api_key: apiKey,
            language: "en-US",
          },
        }
      );
    });

    const preFavorites = await Promise.all(favoritePromises);
    const favorites = preFavorites.map((el) => el.data);

    dispatch(setFavorites(favorites));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

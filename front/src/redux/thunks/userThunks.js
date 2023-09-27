import axios from "axios";

import { setUser } from "../slices/userSlice";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;
const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const signupAxios = async (sendData) => {
  try {
    const response = await axios.post(`${serverUrl}/user/signup`, sendData);
    console.log("response.data", response.data);
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
    const userResponse = await axios.get(`${serverUrl}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (userResponse) {
      dispatch(setUser(userResponse.data));
    }
  } catch (err) {
    console.log("Authorization error : ", err);
  }
};

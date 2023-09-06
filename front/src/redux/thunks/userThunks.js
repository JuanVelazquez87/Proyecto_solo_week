import axios from "axios";
import { setToken } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;
const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;

const dispatch = useDispatch();
export const signupAxios = async (sendData) => {
  try {
    const response = await axios.post(`${serverUrl}/user/signup`, sendData);
    console.log("response.data", response.data);
  } catch (err) {
    console.log(err);
  }
};

export const signinAxios = async (sendData) => {
  try {
    const response = await axios.post(`${serverUrl}/user/login`, sendData, {
      withCredentials: true,
    });
    console.log("response.data", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

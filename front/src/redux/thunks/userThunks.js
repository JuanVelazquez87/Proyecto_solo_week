import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;
const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const signupAxios = async (sendData) => {
  try {
    console.log("sendData > ", sendData);
    const response = await axios.post(`${serverUrl}/user/signup`, sendData);
    console.log("response.data", response.data);
  } catch (err) {
    console.log(err);
  }
};

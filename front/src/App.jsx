import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ContentGrid from "./pages/ContentGrid";
import { ThemeProvider } from "@mui/material";
import theme from "./Styles/theme";
import Header from "./components/header/Header";

import { Home } from "./pages/Home";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllFavorites, fetchUserData } from "./redux/thunks/userThunks";
import { Favorites } from "./pages/Favorites";

import LogedHeader from "./components/header/LogedHeader";
import {
  fetchAllMovies,
  fetchAllTvContent,
} from "./redux/thunks/contentThunks";
import Detail from "./components/Detail";
import { setContentDetails } from "./redux/slices/contentSlice";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const content = useSelector((state) => state.content);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUserData(token, dispatch);
    }
  }, []);
  useEffect(() => {
    if (!content.contentDetails) {
      const contentDetails = JSON.parse(localStorage.getItem("contentDetails"));
      console.log("contentDetails", contentDetails);

      dispatch(setContentDetails(contentDetails));
    }
  }, [dispatch]);
  useEffect(() => {
    const contentType = localStorage.getItem("contentType");

    if (!content.allContent || content.allContent.length === 0) {
      if (contentType) {
        if (contentType === "tv") {
          console.log("entreee en tv");
          fetchAllTvContent(dispatch);
        } else if (contentType === "movie") {
          fetchAllMovies(dispatch);
        }
      }
    }
  }, [dispatch, content.allContent]);

  useEffect(() => {
    try {
      if (user.favorites) {
        fetchAllFavorites(user.favorites, dispatch);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }, [dispatch, user]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {user ? <LogedHeader /> : <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contentGrid" element={<ContentGrid />} />
          {content.contentDetails && (
            <Route path="/detail" element={<Detail />} />
          )}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />

          <Route
            path="/favorites"
            element={user ? <Favorites /> : <Signin />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

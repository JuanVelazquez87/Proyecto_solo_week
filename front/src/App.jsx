import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ContentGrid from "./pages/ContentGrid";
import { ThemeProvider } from "@mui/material";
import theme from "./Styles/theme";
import Header from "./components/header/Header";
import Details from "./pages/Details";
import { Home } from "./pages/Home";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "./redux/thunks/userThunks";
import { Favorites } from "./pages/Favorites";
import { Login } from "@mui/icons-material";
import LogedHeader from "./components/header/LogedHeader";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token, dispatch);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {user ? <LogedHeader /> : <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contentGrid" element={<ContentGrid />} />
          <Route path="/details" element={<Details />} />
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

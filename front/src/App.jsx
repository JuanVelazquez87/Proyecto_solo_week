import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ContentGrid from "./pages/ContentGrid";
import { ThemeProvider } from "@mui/material";
import theme from "./Styles/theme";
import Header from "./components/header/Header";
import Details from "./pages/Details";
import { Home } from "./pages/Home";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contentGrid" element={<ContentGrid />} />
          <Route path="/details" element={<Details />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";

import { Button, Grid } from "@mui/material";
import {
  fetchAllMovies,
  fetchAllTvContent,
  fetchSearchContent,
} from "../../redux/thunks/contentThunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,

    width: "100%",
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const Navigate = useNavigate();

  //user Handlers

  //content Handlers

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchFilter = async (e) => {
    setSearchTerm(e.target.value);
    await fetchSearchContent(dispatch, searchTerm);
    Navigate("/contentGrid");
  };
  const handleMovieFilter = async () => {
    await fetchAllMovies(dispatch);
    Navigate("/contentGrid");
  };
  const handleTvFilter = async () => {
    await fetchAllTvContent(dispatch);
    Navigate("/contentGrid");
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <Grid container spacing={1} textAlign={"center"}>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" noWrap component="div">
              Stream Dreams
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleSearchFilter(e)}
              />
            </Search>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button onClick={handleMovieFilter} sx={{ color: "white" }}>
              Movies
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button onClick={handleTvFilter} sx={{ color: "white" }}>
              TV
            </Button>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              onClick={() => {
                Navigate("/signin");
              }}
              sx={{
                border: "1px solid greenyellow",
                marginRight: "8px",
                ":hover": { backgroundColor: "greenyellow", color: "black" },
              }}
              variant="contained"
            >
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              onClick={() => {
                Navigate("/signup");
              }}
              sx={{
                color: "white",
                backgroundColor: "olivedrab",
                ":hover": {
                  backgroundColor: "greenyellow", // Cambia el color de fondo en el hover
                  color: "black", // Cambia el color del texto en el hover
                },
              }}
              variant="outlined"
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

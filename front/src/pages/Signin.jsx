import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signinAxios } from "../redux/thunks/userThunks";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/authSlice";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/juan-carlos-velazquez"
      >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const sendData = { email, password };
    const response = await signinAxios(sendData, dispatch);
    if (response === "ok") {
      Navigate("/");
    } else {
      console.log("Error: incorrect credentials");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="white" component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                color: "white",
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root": {
                  color: "white",
                  borderColor: "ActiveBorder",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "ActiveBorder",
                  },
                  "&:hover fieldset": {
                    border: "2px solid ActiveBorder",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                color: "white",
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputBase-root": {
                  color: "white",
                  borderColor: "ActiveBorder",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "ActiveBorder",
                  },
                  "&:hover fieldset": {
                    border: "2px solid ActiveBorder",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signupAxios } from "../redux/thunks/userThunks";
import { useNavigate } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography color="white" variant="body2" align="center" {...props}>
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
export default function SignUp() {
  const Navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    const sendData = { firstName, lastName, password, email };
    signupAxios(sendData);
    Navigate("/signin");
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
            Sign up
          </Typography>
          <Box
            component="form"
            color="white"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid sx={{ color: "white" }} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  back
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
              </Grid>
              <Grid color="ActiveBorder" item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="secondary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

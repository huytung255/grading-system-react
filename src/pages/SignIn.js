import React, { useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../redux/user";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import SocialAuth from "../components/SocialAuth";
import MyDivider from "../components/MyDivider";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
export default function SignIn({ location }) {
  const { state } = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") === "admin" && data.get("password") === "admin") {
      localStorage.setItem("token", "token");
      dispatch(setIsAuthenticated(true));
      navigate(state ? state.from.pathname : "/");
    } else {
      dispatch(setErrorMsg("Incorrect email or password."));
    }
  };

  return (
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
        <Typography
          component="h1"
          variant="h3"
          sx={{
            fontWeight: 900,
            color: "text.secondary",
          }}
        >
          SIGN IN
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          {/* <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" size="small" />
              }
              label={
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                  }}
                >
                  Remember me
                </Typography>
              }
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <MyDivider text="Or sign in with" />
          <SocialAuth />
          <Grid container>
            <Grid item xs>
              <NavLink
                to="/reset-password"
                variant="body2"
                style={{
                  fontWeight: 500,
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                to="/sign-up"
                variant="body2"
                style={{
                  fontWeight: 500,
                  textDecoration: "none",
                  fontSize: 15,
                }}
              >
                {"Don't have an account? Sign Up."}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

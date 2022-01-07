import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setToken, setUserId } from "../redux/user";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import SocialAuth from "../components/SocialAuth";
import MyDivider from "../components/MyDivider";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import axiosClient from "../api/axiosClient";
import useQuery from "../hooks/useQuery";
export default function SignIn() {
  let query = useQuery();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setLoading(true);
      const res = await axiosClient.post("/api/login", {
        email: data.get("email"),
        password: data.get("password"),
      });
      setLoading(false);
      const { token, id } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      dispatch(setToken(token));
      dispatch(setUserId(id));
      dispatch(setIsAuthenticated(true));

      if (state) {
        navigate({
          pathname: state.from.pathname,
          search: state.from.search,
        });
        // navigate("/class/9/feed");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  };
  useEffect(() => {
    if (query.get("confirmed")) {
      if (query.get("confirmed") === "true")
        dispatch(setSuccessMsg("Your account is successfully verified!"));
    }
  }, []);
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
          <LoadingButton
            type="submit"
            loading={loading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <MyDivider text="Or sign in with" />
          <SocialAuth
            pathname={state ? state.from.pathname : "/"}
            search={state ? state.from.search : ""}
          />
          <Grid container>
            <Grid item xs>
              <NavLink
                to="/forgot-password"
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

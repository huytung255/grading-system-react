import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import SocialAuth from "../components/SocialAuth";
import MyDivider from "../components/MyDivider";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import axiosClient from "../api/axiosClient";
import LoadingButton from "@mui/lab/LoadingButton";
export default function SignUp() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      try {
        setLoading(true);
        const res = await axiosClient.post("/api/register", { ...data });
        setLoading(false);
        const { message } = res.data.message;
        dispatch(setSuccessMsg(message));
        navigate("/sign-in");
      } catch (error) {
        setLoading(false);
        if (error.response) {
          dispatch(setErrorMsg(error.response.data.message));
        } else console.log(error);
      }
    } else {
      dispatch(setErrorMsg("Password and confirm password does not match."));
    }
  };

  return (
    <>
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
            SIGN UP
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <TextField
                        required
                        error={!!errors.name}
                        variant="outlined"
                        label="Full Name"
                        fullWidth={true}
                        margin="dense"
                        autoFocus
                        {...field}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{ required: true, pattern: "[0-9]" }}
                  render={({ field }) => {
                    return (
                      <TextField
                        required
                        type="number"
                        error={!!errors.phone}
                        variant="outlined"
                        label="Phone number"
                        fullWidth={true}
                        margin="dense"
                        {...field}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        required
                        helperText="Enter a valid email address."
                        error={!!errors.email}
                        variant="outlined"
                        label="Email Address"
                        fullWidth={true}
                        margin="dense"
                        {...field}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: true, minLength: 8 }}
                  render={({ field }) => {
                    return (
                      <TextField
                        required
                        helperText="Password must be at least 8 characters."
                        error={!!errors.password}
                        variant="outlined"
                        label="Password"
                        fullWidth={true}
                        margin="dense"
                        type="password"
                        {...field}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{ required: true, minLength: 8 }}
                  render={({ field }) => {
                    return (
                      <TextField
                        required
                        error={!!errors.confirmPassword}
                        variant="outlined"
                        label="Confirm Password"
                        fullWidth={true}
                        margin="dense"
                        type="password"
                        {...field}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            <MyDivider text="Or sign up with" />
            <SocialAuth />
            <Grid container justifyContent="flex-end" marginBottom={5}>
              <Grid item>
                <NavLink
                  to="/sign-in"
                  variant="body2"
                  style={{
                    fontWeight: 500,
                    textDecoration: "none",
                    fontSize: 15,
                  }}
                >
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

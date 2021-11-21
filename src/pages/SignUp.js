import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import SocialAuth from "../components/SocialAuth";
import MyDivider from "../components/MyDivider";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
export default function SignUp() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = async (data) => {
    if (data.password === data.retypePassword) {
      console.log(data);
    } else {
      dispatch(setErrorMsg("Password and retype password does not match."));
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
              <Grid item xs={12}>
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
                        label="Name"
                        fullWidth={true}
                        margin="dense"
                        autoFocus
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
                  name="retypePassword"
                  control={control}
                  defaultValue=""
                  rules={{ required: true, minLength: 8 }}
                  render={({ field }) => {
                    return (
                      <TextField
                        required
                        error={!!errors.retypePassword}
                        variant="outlined"
                        label="Retype Password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
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

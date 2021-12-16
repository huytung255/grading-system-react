import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import { Controller, useForm } from "react-hook-form";
import useQuery from "../hooks/useQuery";
import axiosClient from "../api/axiosClient";
export default function NewPassword() {
  const query = useQuery();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      try {
        const res = await axiosClient.post("/api/users/reset-password", {
          email: query.get("email"),
          code: query.get("code"),
          password: data.password,
          confirmPassword: data.confirmPassword,
        });
        dispatch(setSuccessMsg(res.data.message));
        navigate("/");
      } catch (error) {
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
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "text.secondary",
            }}
          >
            NEW PASSWORD
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
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
                        label="New Password"
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
                        label="Confirm New Password"
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
              disabled={!isValid}
            >
              reset password
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

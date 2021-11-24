import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import axiosClient from "../api/axiosClient";
export default function ForgotPassword() {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await axiosClient.post("/api/users/forget-password", {
        email: data.get("email"),
      });
      dispatch(setSuccessMsg(res.data.message));
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
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
            FORGOT PASSWORD
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send reset email
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

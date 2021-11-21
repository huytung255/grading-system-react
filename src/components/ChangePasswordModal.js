import {
  Modal,
  TextField,
  Typography,
  Box,
  Stack,
  Button,
  Fade,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setErrorMsg } from "../redux/alert";
import axiosClient from "../api/axiosClient";
const ChangePasswordModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    if (data.newPassword !== data.retypeNewPassword) {
      dispatch(setErrorMsg("Password and retype password does not match."));
    } else {
      console.log(data);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            px: 3,
            py: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 1 }}>
            Change Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="oldPassword"
              control={control}
              defaultValue=""
              shouldUnregister={true}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    error={!!errors.oldPassword}
                    type="password"
                    variant="outlined"
                    label="Old Password"
                    fullWidth={true}
                    margin="dense"
                    required={true}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              shouldUnregister={true}
              rules={{ required: true, minLength: 8 }}
              render={({ field }) => {
                return (
                  <TextField
                    error={!!errors.newPassword}
                    helperText="Password must be at least 8 characters."
                    type="password"
                    variant="outlined"
                    label="New Password"
                    fullWidth={true}
                    margin="dense"
                    required={true}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="retypeNewPassword"
              control={control}
              defaultValue=""
              shouldUnregister={true}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    error={!!errors.retypeNewPassword}
                    type="password"
                    variant="outlined"
                    label="Retype New Password"
                    fullWidth={true}
                    margin="dense"
                    required={true}
                    {...field}
                  />
                );
              }}
            />

            <Stack direction="row-reverse" spacing={2} sx={{ mt: 3 }}>
              <Button
                disabled={!isValid}
                variant="text"
                size="small"
                type="submit"
              >
                Change
              </Button>
              <Button
                variant="text"
                onClick={onClose}
                size="small"
                color="inherit"
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChangePasswordModal;

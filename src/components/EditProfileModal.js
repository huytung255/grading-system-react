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
import axiosClient from "../api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
const EditProfileModal = ({
  open,
  onClose,
  fetchAPI,
  name,
  phone,
  studentId,
}) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.post("/api/users/dashboard", {
        name: data.name,
        phone: data.phone,
        student_id: data.studentId,
      });
      dispatch(setSuccessMsg(res.data.message));
      fetchAPI();
      onClose();
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
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
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue={name}
              shouldUnregister={true}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    error={!!errors.name}
                    variant="outlined"
                    label="Name"
                    fullWidth={true}
                    margin="dense"
                    required={true}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue={phone}
              shouldUnregister={true}
              rules={{ required: true, pattern: "[0-9]" }}
              render={({ field }) => (
                <TextField
                  error={!!errors.phone}
                  type="number"
                  variant="outlined"
                  label="Phone number"
                  fullWidth={true}
                  margin="dense"
                  required={true}
                  {...field}
                />
              )}
            />
            <Controller
              name="studentId"
              control={control}
              defaultValue={studentId}
              shouldUnregister={true}
              rules={{ pattern: "[0-9]" }}
              render={({ field }) => (
                <TextField
                  error={!!errors.studentId}
                  type="number"
                  variant="outlined"
                  label="Student ID"
                  fullWidth={true}
                  margin="dense"
                  {...field}
                />
              )}
            />

            <Stack direction="row-reverse" spacing={2} sx={{ mt: 3 }}>
              <Button
                disabled={!isValid}
                variant="text"
                size="small"
                type="submit"
              >
                Edit
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

export default EditProfileModal;

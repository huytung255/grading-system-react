import {
  Modal,
  TextField,
  Typography,
  Box,
  Stack,
  Button,
  Fade,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axiosClient from "../api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
const AddNewModal = ({
  open,
  onClose,
  fetchAPI,
  isEditing,
  classInfo,
  classId,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = async (data) => {
    try {
      let res;
      setLoading(true);
      if (isEditing) {
        res = await axiosClient.put("/api/classes/" + classId, {
          className: data.name,
          classSection: data.section,
          subject: data.subject,
          room: data.room,
        });
      } else {
        res = await axiosClient.post("/api/classes", {
          className: data.name,
          classSection: data.section,
          subject: data.subject,
          room: data.room,
        });
      }
      setLoading(false);
      dispatch(setSuccessMsg(res.data.message));
      fetchAPI();
      onClose();
    } catch (error) {
      setLoading(false);
      if (error.response) {
        dispatch(setErrorMsg(error.response.data));
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
            {isEditing ? "Edit" : "Create"} class
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue={classInfo ? classInfo.name : ""}
              shouldUnregister={true}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    error={!!errors.name}
                    variant="outlined"
                    label="Class name"
                    fullWidth={true}
                    margin="dense"
                    required={true}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="section"
              control={control}
              defaultValue={classInfo ? classInfo.section : ""}
              shouldUnregister={true}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label="Section"
                  fullWidth={true}
                  margin="dense"
                  {...field}
                />
              )}
            />
            <Controller
              name="subject"
              control={control}
              defaultValue={classInfo ? classInfo.subject : ""}
              shouldUnregister={true}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label="Subject"
                  fullWidth={true}
                  margin="dense"
                  {...field}
                />
              )}
            />
            <Controller
              name="room"
              control={control}
              defaultValue={classInfo ? classInfo.room : ""}
              shouldUnregister={true}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label="Room"
                  fullWidth={true}
                  margin="dense"
                  {...field}
                />
              )}
            />

            <Stack direction="row-reverse" spacing={2} sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                loading={loading}
                variant="text"
                size="small"
                disabled={!isValid}
              >
                {isEditing ? "Edit" : "Create"}
              </LoadingButton>
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

export default AddNewModal;

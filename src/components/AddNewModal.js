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
const AddNewModal = ({ open, onClose, fetchAPI }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = async (data) => {
    const res = await axiosClient.post("/classes/add", { ...data });
    if (res.data === "1 record inserted") {
      fetchAPI();
      onClose();
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
            Create class
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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

            <Stack direction="row-reverse" spacing={2} sx={{ mt: 3 }}>
              <Button
                disabled={!isValid}
                variant="text"
                size="small"
                type="submit"
              >
                Create
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

export default AddNewModal;

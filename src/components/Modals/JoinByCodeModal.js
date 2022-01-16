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
import { useNavigate } from "react-router";
const JoinByCodeModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    console.log("asdasd");
    navigate("/accept-invitation?classID=" + data.code);
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
            width: {
              xs: 350,
              sm: 400,
              md: 500,
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            px: 3,
            py: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 1 }}>
            Join class by code
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="code"
              control={control}
              defaultValue=""
              shouldUnregister={true}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    error={!!errors.code}
                    helperText="Ask your teacher for this code."
                    variant="outlined"
                    label="Code"
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
                Join
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

export default JoinByCodeModal;

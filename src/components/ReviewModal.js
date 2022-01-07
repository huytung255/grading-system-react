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
const ReviewModal = ({
  open,
  onClose,
  classId,
  studentGradeId,
  setIsRequested,
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
      res = await axiosClient.post("/api/grade-review", {
        studentGrade_Id: studentGradeId,
        expectedGrade: data.expectedGrade,
        studentExplanation: data.explanation,
      });
      setLoading(false);
      setIsRequested(true);
      dispatch(setSuccessMsg("Grade review is requested."));
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
            Request review
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="expectedGrade"
              control={control}
              defaultValue={0}
              shouldUnregister={true}
              rules={{ required: true, pattern: "[0-9]" }}
              render={({ field }) => {
                return (
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.expectedGrade}
                    type="number"
                    variant="outlined"
                    label="Expected grade"
                    fullWidth={true}
                    margin="dense"
                    required={true}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="explanation"
              control={control}
              defaultValue={""}
              shouldUnregister={true}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    error={!!errors.name}
                    variant="outlined"
                    label="Explanation"
                    fullWidth={true}
                    margin="dense"
                    required={true}
                    {...field}
                  />
                );
              }}
            />

            <Stack direction="row-reverse" spacing={2} sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                loading={loading}
                variant="text"
                size="small"
                disabled={!isValid}
              >
                Request
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

export default ReviewModal;

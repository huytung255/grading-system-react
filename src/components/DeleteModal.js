import { Modal, Typography, Box, Stack, Button, Fade } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router";
import LoadingButton from "@mui/lab/LoadingButton";
const DeleteModal = ({ open, onClose, classId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onDelete = async (data) => {
    try {
      setLoading(true);
      const res = await axiosClient.delete("/api/classes/" + classId);
      setLoading(false);
      dispatch(setSuccessMsg(res.data.message));
      onClose();
      navigate("/");
    } catch (error) {
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
            Delete this class
          </Typography>
          <Typography variant="p">
            Do you really want to delete this class?
          </Typography>
          <Stack direction="row-reverse" spacing={2} sx={{ mt: 3 }}>
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              color="error"
              size="small"
              onClick={onDelete}
            >
              Delete
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
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;

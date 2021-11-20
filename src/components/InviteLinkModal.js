import {
  Modal,
  Typography,
  Box,
  Stack,
  Fade,
  Paper,
  IconButton,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import axiosClient from "../api/axiosClient";
import AssignmentIcon from "@mui/icons-material/Assignment";
const InviteLinkModal = ({ open, onClose }) => {
  //   const { handleSubmit, control, formState: errors, getValues } = useForm();

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
          <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
            Invite teachers
          </Typography>
          <Stack direction="row" marginBottom={2}>
            <Paper
              sx={{
                overflowX: "scroll",
                paddingLeft: 2,
                backgroundColor: "secondary.dark",
                color: "secondary.contrastText",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
              }}
              elevation={0}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              voluptatum optio. Ad similique accusamus ab iure, ratione omnis,
              labore maxime suscipit laudantium cumque autem qui voluptas magni,
              iste eius dolor?
            </Paper>
            <IconButton
              color="primary"
              sx={{ ml: 1 }}
              onClick={() => {
                navigator.clipboard.writeText("Teacher");
              }}
            >
              <AssignmentIcon />
            </IconButton>
          </Stack>
          <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
            Invite students
          </Typography>
          <Stack direction="row" marginBottom={2}>
            <Paper
              sx={{
                overflowX: "scroll",
                paddingLeft: 2,
                backgroundColor: "secondary.dark",
                color: "secondary.contrastText",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
              }}
              elevation={0}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              voluptatum optio. Ad similique accusamus ab iure, ratione omnis,
              labore maxime suscipit laudantium cumque autem qui voluptas magni,
              iste eius dolor?
            </Paper>
            <IconButton
              color="primary"
              sx={{ ml: 1 }}
              onClick={() => {
                navigator.clipboard.writeText("Student");
              }}
            >
              <AssignmentIcon />
            </IconButton>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default InviteLinkModal;

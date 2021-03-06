import {
  Modal,
  Typography,
  Box,
  Stack,
  Fade,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { setErrorMsg } from "../../redux/alert";
import { useDispatch } from "react-redux";

const InviteLinkModal = ({ open, onClose, classId }) => {
  const dispatch = useDispatch();
  const [inviteStudent, setInviteStudent] = useState("");
  const [inviteTeacher, setInviteTeacher] = useState("");
  async function fetchAPI() {
    try {
      const res = await axiosClient.get(
        "/api/classes/" + classId + "/get-teacher-join-link"
      );
      setInviteTeacher(res.data.joinLink);
      const res2 = await axiosClient.get(
        "/api/classes/" + classId + "/get-student-join-link"
      );
      setInviteStudent(res2.data.joinLink);
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMsg(error.response.data));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);

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
          <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
            Invite teachers
          </Typography>
          <Stack direction="row" marginBottom={2}>
            <TextField variant="outlined" fullWidth value={inviteTeacher} />
            <Box
              sx={{
                ml: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tooltip title="Copy">
                <IconButton
                  color="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(inviteTeacher);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
          <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
            Invite students
          </Typography>
          <Stack direction="row" marginBottom={2}>
            <TextField variant="outlined" fullWidth value={inviteStudent} />
            <Box
              sx={{
                ml: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tooltip title="Copy">
                <IconButton
                  color="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(inviteStudent);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default InviteLinkModal;

import {
  Modal,
  Typography,
  Box,
  Stack,
  Fade,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { setErrorMsg } from "../redux/alert";
import { useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
const LinkTextField = styled(TextField)(({ theme }) => ({
  "& .Mui-disabled": {
    background: theme.palette.primary.main,
    WebkitTextFillColor: theme.palette.primary.contrastText,
    borderRadius: 5,
    borderBottom: "none !important",
  },
  "& .Mui-disabled::after": {
    borderBottom: "none !important",
  },
  "& .Mui-disabled::before": {
    borderBottom: "none !important",
  },
}));
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
            {/* <Paper
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
              {inviteTeacher}
            </Paper> */}
            <LinkTextField
              defaultValue={inviteTeacher}
              variant="filled"
              fullWidth
              disabled
            />
            <Box
              sx={{
                ml: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                color="primary"
                onClick={() => {
                  navigator.clipboard.writeText(inviteTeacher);
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Stack>
          <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
            Invite students
          </Typography>
          <Stack direction="row" marginBottom={2}>
            {/* <Paper
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
              {inviteStudent}
            </Paper> */}
            <LinkTextField
              defaultValue={inviteStudent}
              variant="filled"
              fullWidth
              disabled
            />
            <Box
              sx={{
                ml: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                color="primary"
                onClick={() => {
                  navigator.clipboard.writeText(inviteStudent);
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default InviteLinkModal;

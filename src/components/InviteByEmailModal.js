import {
  Modal,
  TextField,
  Typography,
  Box,
  Stack,
  Button,
  Fade,
  Chip,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import SendIcon from "@mui/icons-material/Send";
const InviteByEmailModal = ({ open, onClose, preSelectedTarget }) => {
  const [input, setInput] = useState("");
  const [target, setTarget] = useState("teacher");
  const [receivers, setReceivers] = useState([]);
  useEffect(() => {
    console.log(preSelectedTarget);
    if (preSelectedTarget) setTarget(preSelectedTarget);
  }, [preSelectedTarget]);
  useEffect(() => {
    if (open === false) {
      setInput("");
      setTarget("teacher");
      setReceivers([]);
    }
  }, [open]);
  const enterPressed = (e) => {
    if (e.keyCode == 13 && input.length !== 0) {
      setReceivers([...receivers, input]);
      setInput("");
    }
  };
  const handleAdd = () => {
    setReceivers([...receivers, input]);
    setInput("");
  };
  const removeReceiver = (i) => {
    let newReceivers = [...receivers];
    newReceivers.splice(i, 1);
    setReceivers([...newReceivers]);
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
            Invite By Email
          </Typography>
          <Stack direction="row" spacing={1} marginBottom={3}>
            <Button
              variant={target === "teacher" ? "contained" : "outlined"}
              onClick={() => {
                setTarget("teacher");
              }}
              sx={{ flexGrow: 1 }}
            >
              To Teachers
            </Button>
            <Button
              variant={target === "student" ? "contained" : "outlined"}
              onClick={() => {
                setTarget("student");
              }}
              sx={{ flexGrow: 1 }}
            >
              To Students
            </Button>
          </Stack>
          <Stack direction="row" marginBottom={2} width="100%">
            <TextField
              variant="filled"
              label={target + "'s email"}
              InputLabelProps={{ sx: { textTransform: "capitalize" } }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={enterPressed}
              fullWidth={true}
            />
            <Button
              disabled={input.length === 0}
              variant="contained"
              onClick={handleAdd}
            >
              Add
            </Button>
          </Stack>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "text.secondary",
              mb: 1,
              textTransform: "capitalize",
            }}
          >
            {target}s to be invited:
          </Typography>
          <Stack direction="row" width="100%" flexWrap="wrap">
            {receivers.map((receiver, i) => (
              <Chip
                color={"primary"}
                key={i}
                label={receiver}
                onClick={() => removeReceiver(i)}
                onDelete={() => removeReceiver(i)}
                sx={{ m: 0.25 }}
              />
            ))}
          </Stack>
          <Stack direction="row-reverse" spacing={2} sx={{ mt: 1 }}>
            <Button
              variant="text"
              size="small"
              disabled={receivers.length === 0 ? true : false}
            >
              Invite
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
        </Box>
      </Fade>
    </Modal>
  );
};

export default InviteByEmailModal;

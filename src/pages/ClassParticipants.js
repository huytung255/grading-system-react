import { Container, Paper, Stack, Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InviteByEmailModal from "../components/InviteByEmailModal";

const ClassParticipants = () => {
  const [target, setTarget] = useState("teacher");
  const [openInviteByEmail, setOpenInviteByEmail] = useState(false);
  const handleOpenInviteByEmail = (target) => {
    setOpenInviteByEmail(true);
    setTarget(target);
  };
  const handleCloseInviteByEmail = (target) => {
    setOpenInviteByEmail(false);
    setTarget(target);
  };
  return (
    <Container
      sx={{
        marginTop: 5,
      }}
      maxWidth="md"
    >
      <Stack
        direction="row"
        sx={{
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "primary.light",
          p: 2,
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          color="primary.main"
          sx={{ fontWeight: "500", flexGrow: 1 }}
        >
          Teachers
        </Typography>

        <IconButton
          color="primary"
          onClick={() => handleOpenInviteByEmail("teacher")}
        >
          <GroupAddIcon />
        </IconButton>
        <InviteByEmailModal
          open={openInviteByEmail}
          onClose={handleCloseInviteByEmail}
          preSelectedTarget={target}
        />
      </Stack>
      <Paper sx={{ p: 2 }} elevation={0}>
        <Stack direction="row" alignItems="center" marginBottom={1}>
          <Avatar
            alt="Remy Sharp"
            src="https://i.pravatar.cc/300"
            sx={{ width: 45, height: 45 }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              marginLeft: 2,
            }}
          >
            Remy Sharp
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" marginBottom={1}>
          <Avatar
            alt="Remy Sharp"
            src="https://i.pravatar.cc/300"
            sx={{ width: 45, height: 45 }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              marginLeft: 2,
            }}
          >
            Remy Sharp
          </Typography>
        </Stack>
      </Paper>
      <Stack
        direction="row"
        sx={{
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "primary.light",
          p: 2,
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          color="primary.main"
          sx={{ fontWeight: "500", flexGrow: 1 }}
        >
          Students
        </Typography>

        <IconButton
          color="primary"
          onClick={() => handleOpenInviteByEmail("student")}
        >
          <GroupAddIcon />
        </IconButton>
      </Stack>
      <Paper sx={{ p: 2 }} elevation={0}>
        <Stack direction="row" alignItems="center" marginBottom={1}>
          <Avatar
            alt="Remy Sharp"
            src="https://i.pravatar.cc/300"
            sx={{ width: 45, height: 45 }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              marginLeft: 2,
            }}
          >
            Remy Sharp
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" marginBottom={1}>
          <Avatar
            alt="Remy Sharp"
            src="https://i.pravatar.cc/300"
            sx={{ width: 45, height: 45 }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              marginLeft: 2,
            }}
          >
            Remy Sharp
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ClassParticipants;

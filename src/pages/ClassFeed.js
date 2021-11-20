import { Container, Grid, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import EmailIcon from "@mui/icons-material/Email";
import InviteLinkModal from "../components/InviteLinkModal";
import InviteByEmailModal from "../components/InviteByEmailModal";
const ClassFeed = () => {
  // const { classId } = useParams();
  const [openInviteLink, setOpenInviteLink] = useState(false);
  const [openInviteByEmail, setOpenInviteByEmail] = useState(false);
  const handleOpenInviteLink = () => setOpenInviteLink(true);
  const handleCloseInviteLink = () => setOpenInviteLink(false);
  const handleOpenInviteByEmail = () => setOpenInviteByEmail(true);
  const handleCloseInviteByEmail = () => setOpenInviteByEmail(false);
  return (
    <Container
      sx={{
        marginTop: 5,
      }}
      maxWidth="md"
    >
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          bgcolor: "primary.dark",
          position: "relative",
          marginBottom: 2,
        }}
      >
        <CardContent
          sx={{
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: 35,
              fontWeight: 600,
              color: "white",
            }}
          >
            Some name
          </Typography>
          <Typography
            sx={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Some section
          </Typography>
          <Typography
            sx={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Some subject
          </Typography>
        </CardContent>
      </Card>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            startIcon={<LinkIcon />}
            sx={{ width: "100%", fontWeight: 500, mb: 1 }}
            variant="contained"
            onClick={handleOpenInviteLink}
          >
            Invite Link
          </Button>
          <Button
            variant="outlined"
            startIcon={<EmailIcon />}
            sx={{ width: "100%", fontWeight: 500 }}
            variant="contained"
            onClick={handleOpenInviteByEmail}
          >
            Invite By Email
          </Button>
          <InviteLinkModal
            open={openInviteLink}
            onClose={handleCloseInviteLink}
          />
          <InviteByEmailModal
            open={openInviteByEmail}
            onClose={handleCloseInviteByEmail}
          />
        </Grid>
        <Grid item xs={9}>
          <Paper
            sx={{
              width: "100%",
              paddingTop: 2,
              paddingLeft: 3,
              paddingBottom: 2,
              paddingRight: 3,
            }}
          >
            <Stack direction="row" marginBottom={1}>
              <Avatar
                alt="Remy Sharp"
                src="https://i.pravatar.cc/300"
                sx={{ width: 50, height: 50 }}
              />
              <Stack direction="column" width="100%" marginLeft={2}>
                <Typography sx={{ fontWeight: 500, color: "text.primary" }}>
                  Remy Sharp
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  18 Nov
                </Typography>
              </Stack>
            </Stack>
            <Typography sx={{ fontSize: 14, color: "text.primary" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              reprehenderit quaerat iure architecto molestias eveniet. Aliquid
              fugit fuga ab tempora et illo perferendis harum, eos illum dolorum
              vel commodi aspernatur.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClassFeed;

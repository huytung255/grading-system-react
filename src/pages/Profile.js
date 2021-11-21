import React, { useState } from "react";
import {
  Avatar,
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);
  return (
    <Container
      sx={{
        marginTop: 5,
      }}
      maxWidth="md"
    >
      <Grid container spacing={10}>
        <Grid item xs={12} sm={3}>
          <Avatar
            alt="Remy Sharp"
            src="https://i.pravatar.cc/300"
            sx={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid container spacing={3} item xs={12} sm={9}>
          <Grid item xs={12} alignItems="center" display="flex">
            <Box
              sx={{
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                borderBottomColor: "primary.light",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                User Profile
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              variant="filled"
              label="Name"
              fullWidth={true}
              margin="dense"
              value={"Some name"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              disabled
              variant="filled"
              label="Phone number"
              fullWidth={true}
              margin="dense"
              value={"123456789"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              disabled
              variant="filled"
              label="Student ID"
              fullWidth={true}
              margin="dense"
              value={"18000000"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              variant="filled"
              label="Email Address"
              fullWidth={true}
              margin="dense"
              value="example@gmail.com"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              startIcon={<EditIcon />}
              onClick={handleOpenEdit}
            >
              Edit profile
            </Button>
            <EditProfileModal
              open={openEdit}
              onClose={handleCloseEdit}
              name="Some name"
              phone={"123456789"}
              studentId={""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              startIcon={<VpnKeyIcon />}
              onClick={handleOpenChangePassword}
            >
              Change password
            </Button>
            <ChangePasswordModal
              open={openChangePassword}
              onClose={handleCloseChangePassword}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;

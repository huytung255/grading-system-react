import React, { useEffect, useState } from "react";
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
import EditProfileModal from "../components/Modals/EditProfileModal";
import ChangePasswordModal from "../components/Modals/ChangePasswordModal";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
import axiosClient from "../api/axiosClient";
const Profile = () => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    studentId: "",
    email: "",
    image: "",
    registerType: "",
  });
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);
  async function fetchAPI() {
    try {
      const res = await axiosClient.get("/api/users/dashboard");
      const { name, phone, student_id, email, registerType, image } =
        res.data.user;
      setUserInfo({
        name: name,
        phone: phone,
        studentId: student_id,
        email: email,
        image: image,
        registerType: registerType,
      });
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
    <Container
      sx={{
        marginTop: 5,
      }}
      maxWidth="md"
    >
      <Grid container spacing={10}>
        <Grid item xs={12} sm={3}>
          <Avatar
            alt={userInfo.name}
            src={userInfo.image}
            sx={{ width: 150, height: 150 }}
          >
            {userInfo.name.charAt(0)}
          </Avatar>
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
              value={userInfo.name}
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
              value={userInfo.phone ? userInfo.phone : ""}
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
              value={userInfo.studentId ? userInfo.studentId : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              variant="filled"
              label="Email Address"
              fullWidth={true}
              margin="dense"
              value={userInfo.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {userInfo.registerType === "registered" ? (
              <>
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
              </>
            ) : (
              <></>
            )}
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
              fetchAPI={fetchAPI}
              name={userInfo.name}
              phone={userInfo.phone}
              studentId={userInfo.studentId}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;

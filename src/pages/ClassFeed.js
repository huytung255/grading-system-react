import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import EmailIcon from "@mui/icons-material/Email";
import CodeIcon from "@mui/icons-material/Code";
import InviteLinkModal from "../components/Modals/InviteLinkModal";
import InviteByEmailModal from "../components/Modals/InviteByEmailModal";
import { setErrorMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
import axiosClient from "../api/axiosClient";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddNewModal from "../components/Modals/AddNewModal";
import DeleteModal from "../components/Modals/DeleteModal";
import GradeStructure from "../components/ClassFeed/GradeStructure";
import StudentGrade from "../components/ClassFeed/StudentGrade";
import TeacherShortcut from "../components/ClassFeed/TeacherShortcut";
import InviteCodeModal from "../components/Modals/InviteCodeModal";
import { useNavigate } from "react-router-dom";
const ClassFeed = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const dispatch = useDispatch();
  const [role, setRole] = useState();
  const [classInfo, setClassInfo] = useState({
    name: "",
    section: "",
    subject: "",
    room: "",
  });

  const [openInviteLink, setOpenInviteLink] = useState(false);
  const [openInviteCode, setOpenInviteCode] = useState(false);
  const [openInviteByEmail, setOpenInviteByEmail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  //model handlers
  const handleOpenInviteLink = () => setOpenInviteLink(true);
  const handleCloseInviteLink = () => setOpenInviteLink(false);
  const handleOpenInviteCode = () => setOpenInviteCode(true);
  const handleCloseInviteCode = () => setOpenInviteCode(false);
  const handleOpenInviteByEmail = () => setOpenInviteByEmail(true);
  const handleCloseInviteByEmail = () => setOpenInviteByEmail(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  async function fetchAPI() {
    try {
      const res = await axiosClient.get("/api/classes/" + classId);
      const { userRole, className, classSection, subject, room } = res.data;
      setRole(userRole);
      setClassInfo({
        name: className,
        section: classSection,
        subject: subject,
        room: room,
      });
    } catch (error) {
      if (error.response.data.message) {
        if (error.response.data.message === "You are not allowed!")
          navigate("/");
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, [classId]);
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
            {classInfo.name}
          </Typography>
          {classInfo.section !== "" ? (
            <Typography
              sx={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Section: {classInfo.section}
            </Typography>
          ) : (
            <></>
          )}
          {classInfo.subject !== "" ? (
            <Typography
              sx={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Subject: {classInfo.subject}
            </Typography>
          ) : (
            <></>
          )}
          {classInfo.room !== "" ? (
            <Typography
              sx={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Room: {classInfo.room}
            </Typography>
          ) : (
            <></>
          )}
        </CardContent>
        {role === "teacher" ? (
          <Stack
            direction="row"
            spacing={1}
            position="absolute"
            top={10}
            right={10}
          >
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleOpenEdit}
            >
              <EditIcon sx={{ fill: "#FFFFFF" }} color="inherit" />
            </Button>
            <AddNewModal
              open={openEdit}
              onClose={handleCloseEdit}
              fetchAPI={fetchAPI}
              isEditing={true}
              classInfo={classInfo}
              classId={classId}
            />
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleOpenDelete}
            >
              <DeleteIcon />
            </Button>
            <DeleteModal
              open={openDelete}
              onClose={handleCloseDelete}
              classId={classId}
            />
          </Stack>
        ) : (
          ""
        )}
      </Card>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <GradeStructure classId={classId} role={role} />
          {role === "teacher" ? (
            <>
              <Button
                startIcon={<LinkIcon />}
                sx={{ width: "100%", fontWeight: 500, mb: 1 }}
                variant="contained"
                onClick={handleOpenInviteLink}
              >
                Invite Link
              </Button>
              <Button
                startIcon={<CodeIcon />}
                sx={{ width: "100%", fontWeight: 500, mb: 1 }}
                variant="contained"
                onClick={handleOpenInviteCode}
              >
                Invite Code
              </Button>
              <Button
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
                classId={classId}
              />
              <InviteCodeModal
                open={openInviteCode}
                onClose={handleCloseInviteCode}
                classId={classId}
              />
              <InviteByEmailModal
                open={openInviteByEmail}
                onClose={handleCloseInviteByEmail}
                classId={classId}
              />
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          {role === "student" && <StudentGrade classId={classId} />}
          {role === "teacher" && <TeacherShortcut classId={classId} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClassFeed;

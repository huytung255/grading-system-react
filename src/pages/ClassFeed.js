import { Container, Grid, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Avatar } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import EmailIcon from "@mui/icons-material/Email";
import InviteLinkModal from "../components/InviteLinkModal";
import InviteByEmailModal from "../components/InviteByEmailModal";
import { setErrorMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
import axiosClient from "../api/axiosClient";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddNewModal from "../components/AddNewModal";
import DeleteModal from "../components/DeleteModal";
const ClassFeed = () => {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const [role, setRole] = useState("student");
  const [classInfo, setClassInfo] = useState({
    name: "",
    section: "",
    subject: "",
    room: "",
  });
  const [gradeStructure, setGradeStructure] = useState({
    Midterm: 40,
    Final: 60,
  });
  const [openInviteLink, setOpenInviteLink] = useState(false);
  const [openInviteByEmail, setOpenInviteByEmail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openGradeStructure, setOpenGradeStructure] = useState(false);
  const handleOpenInviteLink = () => setOpenInviteLink(true);
  const handleCloseInviteLink = () => setOpenInviteLink(false);
  const handleOpenInviteByEmail = () => setOpenInviteByEmail(true);
  const handleCloseInviteByEmail = () => setOpenInviteByEmail(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenGradeStructure = () => setOpenGradeStructure(true);
  const handleCloseGradeStructure = () => setOpenGradeStructure(false);
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
      // console.log(error);
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
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
              <EditIcon />
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
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 1.5,
              pb: 2,
              mb: 1,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 700,
                color: "secondary.main",
              }}
            >
              Grade Structure
            </Typography>

            <Stack direction="row" marginBottom={1}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "secondary.main",
                  width: "100%",
                }}
              >
                Total
              </Typography>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "secondary.main",
                }}
              >
                100
              </Typography>
            </Stack>
            {Object.keys(gradeStructure).map((grade, i) => (
              <Stack direction="row" key={i}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "secondary.main",
                    width: "100%",
                  }}
                >
                  {grade}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "secondary.main",
                  }}
                >
                  {gradeStructure[grade]}
                </Typography>
              </Stack>
            ))}
            {role === "teacher" ? (
              <Button
                component={Link}
                to={`/class/${classId}/feed/edit-grade-structure`}
                fullWidth
                variant="text"
                startIcon={<EditIcon />}
                sx={{
                  mt: 1,
                }}
              >
                Edit
              </Button>
            ) : (
              // <Button
              //   onClick={handleOpenGradeStructure}
              //   fullWidth
              //   variant="text"
              //   startIcon={<EditIcon />}
              //   sx={{
              //     mt: 1,
              //   }}
              // >
              //   Edit
              // </Button>
              <></>
            )}
          </Paper>
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

import {
  Container,
  Paper,
  Stack,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InviteByEmailModal from "../components/InviteByEmailModal";
import { setErrorMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
const ClassParticipants = () => {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const [target, setTarget] = useState("teacher");
  const [role, setRole] = useState("student");
  const [students, setStudents] = useState({
    list: [],
    total: 0,
  });
  const [teachers, setTeachers] = useState({
    list: [],
    total: 0,
  });
  const [openInviteByEmail, setOpenInviteByEmail] = useState(false);
  const handleOpenInviteByEmail = (target) => {
    setOpenInviteByEmail(true);
    setTarget(target);
  };
  const handleCloseInviteByEmail = (target) => {
    setOpenInviteByEmail(false);
    setTarget(target);
  };
  async function fetchAPI() {
    try {
      const res = await axiosClient.get("/api/classes/" + classId);
      const { userRole } = res.data;

      setRole(userRole);
      const res2 = await axiosClient.get("/api/classes/" + classId + "/people");

      const { students, teachers } = res2.data;
      setStudents({
        list: [...students.students_list],
        total: students.total,
      });
      setTeachers({
        list: [...teachers.teachers_list],
        total: teachers.total,
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
          {teachers.total} Teachers
        </Typography>
        {role === "teacher" ? (
          <IconButton
            color="primary"
            onClick={() => handleOpenInviteByEmail("teacher")}
          >
            <GroupAddIcon />
          </IconButton>
        ) : (
          <></>
        )}

        <InviteByEmailModal
          open={openInviteByEmail}
          onClose={handleCloseInviteByEmail}
          preSelectedTarget={target}
        />
      </Stack>
      <Paper sx={{ p: 2 }} elevation={0}>
        {teachers.list.map((teacher) => {
          const { id, name, image } = teacher;
          return (
            <Stack
              direction="row"
              alignItems="center"
              marginBottom={2}
              key={id}
            >
              <Avatar alt={name} src={image} sx={{ width: 45, height: 45 }}>
                {name.charAt(0)}
              </Avatar>
              <Typography
                sx={{
                  fontWeight: 500,
                  marginLeft: 2,
                }}
              >
                {name}
              </Typography>
            </Stack>
          );
        })}
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
          {students.total} Students
        </Typography>

        {role === "teacher" ? (
          <IconButton
            color="primary"
            onClick={() => handleOpenInviteByEmail("student")}
          >
            <GroupAddIcon />
          </IconButton>
        ) : (
          <></>
        )}
      </Stack>
      <Paper sx={{ p: 2 }} elevation={0}>
        {students.list.map((student) => {
          const { id, name, image, student_id } = student;
          return (
            <Stack
              direction="row"
              alignItems="center"
              marginBottom={2}
              key={id}
            >
              {role === "teacher" && student_id ? (
                <>
                  <Avatar
                    component={Link}
                    to={`/class/${classId}/studentGrades/${student_id}`}
                    alt={name}
                    src={image}
                    sx={{ width: 45, height: 45, textDecoration: "none" }}
                  >
                    {name.charAt(0)}
                  </Avatar>
                  <Typography
                    component={Link}
                    to={`/class/${classId}/studentGrades/${student_id}`}
                    sx={{
                      fontWeight: 500,
                      marginLeft: 2,
                      color: "inherit",
                    }}
                  >
                    {name}
                  </Typography>
                </>
              ) : (
                <>
                  <Avatar alt={name} src={image} sx={{ width: 45, height: 45 }}>
                    {name.charAt(0)}
                  </Avatar>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      marginLeft: 2,
                    }}
                  >
                    {name}
                  </Typography>
                </>
              )}
            </Stack>
          );
        })}
      </Paper>
    </Container>
  );
};

export default ClassParticipants;

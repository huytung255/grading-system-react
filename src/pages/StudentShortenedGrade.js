import { Container, Typography, Stack, Box, Avatar } from "@mui/material";
import GradingIcon from "@mui/icons-material/Grading";
import React, { useState, useEffect } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShortenedGradeBoard from "../components/ShortenedGradeBoard";
import { Navigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useDispatch } from "react-redux";
import { setErrorMsg } from "../redux/alert";
const StudentShortenedGrade = () => {
  const { classId, studentId } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    studentId: null,
    image: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get(
          `/api/classes/${classId}/student-shortened-grade?studentId=` +
            studentId
        );
        const { user, scores } = res.data;
        if (user === null) setShouldRedirect(true);
        setUser({
          name: user.name,
          image: user.image,
          studentId: user.student_id,
        });
        let newData = [];
        newData.push({
          name: "Total",
          percentage: null,
          grade: scores[scores.length - 1].averagePoint,
        });
        let totalPercentage = 0;
        scores.slice(0, scores.length - 1).forEach((score) => {
          const { finalizedGrade, gradeTitle, gradeDetail } = score;
          totalPercentage += gradeDetail;
          newData.push({
            name: gradeTitle,
            percentage: gradeDetail,
            grade: finalizedGrade,
          });
        });
        newData[0].percentage = totalPercentage;
        setData(newData);
      } catch (error) {
        if (error.response) {
          setShouldRedirect(true);
          dispatch(setErrorMsg(error.response.data.message));
        } else console.log(error);
      }
    };
    fetchData();
  }, []);
  if (shouldRedirect) return <Navigate to="/" />;
  return (
    <Container
      sx={{
        marginTop: 5,
      }}
      maxWidth="sm"
    >
      <Stack flexDirection={{ xs: "column", md: "row" }}>
        <Avatar
          alt={user.name}
          src={user.image}
          sx={{
            width: 70,
            height: 70,
            alignSelf: { xs: "center", md: "start" },
            marginRight: { xs: 0, md: 2 },
            marginBottom: { xs: 2, md: 0 },
          }}
        >
          {user.name.charAt(0)}
        </Avatar>
        {/* <GradingIcon
            sx={{ fill: "#FFFFFF", fontSize: 25 }}
            fontSize="inherit"
          /> */}

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" color="primary.main">
            {user.name}
          </Typography>
          <Typography>{user.studentId}</Typography>

          <Box
            sx={{
              borderBottom: 1,
              width: "100%",
              borderColor: "text.secondary",
              mt: 2,
              mb: 2,
            }}
          ></Box>
          <Box>
            <Stack flexDirection="row" alignItems="center" marginBottom={2}>
              <AssignmentIcon
                sx={{ color: "primary.main", fontSize: 18, mr: 2 }}
                fontSize="inherit"
                color="inherit"
              />
              <Typography fontSize={14} color="primary.main" fontWeight="700">
                Grades
              </Typography>
            </Stack>
          </Box>
          <ShortenedGradeBoard data={data} />
        </Box>
      </Stack>
    </Container>
  );
};

export default StudentShortenedGrade;

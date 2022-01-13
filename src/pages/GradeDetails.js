import { Container, Typography, Stack, Box, Button } from "@mui/material";
import GradingIcon from "@mui/icons-material/Grading";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import React, { useState, useEffect } from "react";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReviewTable from "../components/ReviewTable";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useDispatch } from "react-redux";
import { setErrorMsg } from "../redux/alert";
const GradeDetails = () => {
  const { classId, studentGradeId } = useParams();
  const dispatch = useDispatch();
  const [role, setRole] = useState();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get(
          `/api/grade-review?studentGrade_Id=${studentGradeId}&classId=${classId}`
        );
        const { gradeReview, isTeacher, studentGrade } = res.data;
        const { studentsGrades, gradeTitle } =
          studentGrade[0].classesGradeStructures;
        if (isTeacher) setRole("teacher");
        else setRole("student");
        setData({
          studentName: studentGrade[0].fullName,
          studentId: studentGrade[0].student_id,
          gradeReviewId: gradeReview[0].id,
          createdAt: gradeReview[0].createdAt,
          expectedGrade: gradeReview[0].expectedGrade,
          explanation: gradeReview[0].studentExplanation,
          gradeComposition: gradeTitle,
          finalizedGrade: studentsGrades.finalizedGrade,
          finalDecision: studentsGrades.isFinalDecision
            ? studentsGrades.finalizedGrade
            : null,
        });
        //Skip if there's no comments
        if (gradeReview[0].GradeReviewComments.createdAt) {
          const newComments = gradeReview.map(({ GradeReviewComments }, _) => {
            const { user, content, createdAt } = GradeReviewComments;
            const { name, image } = user;
            return { name, image, content, createdAt };
          });
          setComments(newComments);
        }
      } catch (error) {
        if (error.response) {
          dispatch(setErrorMsg(error.response.data.message));
        } else console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Container
      sx={{
        marginTop: 5,
      }}
      maxWidth="sm"
    >
      <Stack flexDirection="row">
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
            backgroundColor: "primary.main",
            borderRadius: "50%",
            mr: 1,
          }}
        >
          <GradingIcon
            sx={{ fill: "#FFFFFF", fontSize: 25 }}
            fontSize="inherit"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" color="primary.main">
            {data.gradeComposition}
          </Typography>
          <Typography>Grade: {data.finalizedGrade}</Typography>
          {role === "teacher" ? (
            <Typography>
              {data.studentId} - {data.studentName}
            </Typography>
          ) : (
            <></>
          )}

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
                Review
              </Typography>
            </Stack>
            <ReviewTable
              studentGradeId={studentGradeId}
              role={role}
              data={data}
              setData={setData}
            />
          </Box>
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
              <PeopleAltIcon
                sx={{ color: "primary.main", fontSize: 18, mr: 2 }}
                fontSize="inherit"
                color="inherit"
              />
              <Typography fontSize={14} color="primary.main" fontWeight="700">
                Conversation
              </Typography>
            </Stack>
            {comments.map((comment, i) => {
              const { name, image, content, createdAt } = comment;
              return (
                <Comment
                  key={i}
                  name={name}
                  image={image}
                  content={content}
                  createdAt={createdAt}
                />
              );
            })}
          </Box>
          <Box
            sx={{
              borderBottom: 1,
              width: "100%",
              borderColor: "text.secondary",
              mt: 2,
              mb: 2,
            }}
          ></Box>
          <CommentInput
            setComments={setComments}
            gradeReviewId={data.gradeReviewId}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default GradeDetails;

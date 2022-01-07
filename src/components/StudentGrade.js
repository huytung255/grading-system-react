import React, { useEffect } from "react";
import Grade from "./Grade";
import { Paper, Box, Typography } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import axiosClient from "../api/axiosClient";
import { useState } from "react";
const StudentGrade = ({ classId }) => {
  const [grades, setGrades] = useState([]);
  const [average, setAverage] = useState();
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axiosClient.get(
          `/api/classes/${classId}/student-grade`
        );
        const { averagePoint } = res.data[res.data.length - 1];
        setAverage(averagePoint);
        const newGrades = res.data
          .slice(0, res.data.length - 1)
          .map((grade, i) => {
            if (i === res.data.length - 1) {
              return;
            }
            const { finalizedGrade, gradeTitle, gradeReview, id } = grade;
            return {
              finalizedGrade: finalizedGrade,
              title: gradeTitle,
              isRequested: gradeReview !== null,
              studentGradeId: id,
            };
          });
        setGrades(newGrades);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGrades();
  }, []);
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 14,
          color: "text.secondary",
          mb: 1,
        }}
      >
        Your grades:
      </Typography>
      {grades.length !== 0 ? (
        <>
          <Grade
            classId={classId}
            finalizedGrade={average}
            title={"Average"}
            isAverage={true}
          />
          {grades.map((grade, i) => {
            const { finalizedGrade, studentGradeId, title, isRequested } =
              grade;
            return (
              <Grade
                key={i}
                classId={classId}
                studentGradeId={studentGradeId}
                finalizedGrade={finalizedGrade}
                title={title}
                isRequested={isRequested}
              />
            );
          })}
        </>
      ) : (
        <Paper
          sx={{
            width: "100%",
            pt: 2,
            pl: 2,
            pb: 2,
            pr: 2,
            mb: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          variant="outlined"
          elevation={0}
        >
          <PriorityHighIcon sx={{ color: "primary.main" }} color="inherit" />
          <Typography
            sx={{
              fontSize: 14,
              color: "text.secondary",
            }}
          >
            Nothing here yet.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default StudentGrade;

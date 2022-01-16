import React, { useEffect } from "react";
import Grade from "./Grade";
import { Paper, Box, Typography } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import axiosClient from "../../api/axiosClient";
import { useState } from "react";
import EmptyIndicator from "../EmptyIndicator";
const StudentGrade = ({ classId }) => {
  const [grades, setGrades] = useState([]);
  const [average, setAverage] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axiosClient.get(
          `/api/classes/${classId}/student-grade`
        );
        const { scores } = res.data;
        const { averagePoint } = scores[scores.length - 1];
        setAverage(averagePoint);
        const newGrades = scores
          .slice(0, scores.length - 1)
          .filter((grade) => grade.finalizedGrade !== null)
          .map((grade, i) => {
            if (i === scores.length - 1) {
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
        console.log(newGrades);
        setGrades(newGrades);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else console.log(error);
      }
    };

    fetchGrades();
  }, [classId]);
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
        <EmptyIndicator
          msg={error.length === 0 ? "Nothing here yet." : error}
        />
      )}
    </Box>
  );
};

export default StudentGrade;

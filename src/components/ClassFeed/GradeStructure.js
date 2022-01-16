import React, { useState, useEffect } from "react";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axiosClient from "../../api/axiosClient";
import { setErrorMsg } from "../../redux/alert";
import { useDispatch } from "react-redux";
import EmptyIndicator from "../EmptyIndicator";
const GradeStructure = ({ classId, role }) => {
  const [gradeStructure, setGradeStructure] = useState([]);
  const dispatch = useDispatch();
  async function fetchAPI() {
    try {
      const res = await axiosClient.get(
        "/api/classes/" + classId + "/grade-structure"
      );
      setGradeStructure(
        res.data.map((grade) => {
          return {
            title: grade.gradeTitle,
            percentage: Number(grade.gradeDetail),
          };
        })
      );
    } catch (error) {
      // console.log(error);
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, [classId]);
  return (
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
          color: "text.primary",
        }}
      >
        Grade Structure
      </Typography>
      {gradeStructure.length === 0 ? (
        <EmptyIndicator />
      ) : (
        <Stack direction="row" marginBottom={1}>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 500,
              color: "text.primary",
              width: "100%",
            }}
          >
            Total
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            {gradeStructure.reduce(
              (prev, current) => prev + current.percentage,
              0
            )}
          </Typography>
        </Stack>
      )}

      {gradeStructure.map((grade, i) => (
        <Stack direction="row" key={i}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "text.primary",
              width: "100%",
            }}
          >
            {grade.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            {grade.percentage}
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
          // sx={{
          //   mt: 1,
          // }}
        >
          Edit
        </Button>
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default GradeStructure;

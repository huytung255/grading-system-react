import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import MaterialTable from "@material-table/core";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { setErrorMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
import axiosClient from "../api/axiosClient";
const StudentRequests = () => {
  const { classId } = useParams();
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/api/grade-review/" + classId);
        const newRequests = res.data.map((request, i) => {
          const {
            ["studentsClasses.fullName"]: name,
            ["studentsClasses.student_id"]: studentId,
            ["studentsClasses.studentsGrades.id"]: studentGradeId,
            gradeTitle,
            createdAt,
          } = request;
          return {
            studentId,
            name,
            gradeComposition: gradeTitle,
            createdAt: new Date(createdAt).toDateString(),
            studentGradeId,
          };
        });
        setRequests(newRequests);
      } catch (error) {
        if (error.response) {
          dispatch(setErrorMsg(error.response.data.message));
        } else console.log(error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 5,
      }}
    >
      <MaterialTable
        columns={[
          { title: "Student ID", field: "studentId" },
          { title: "Name", field: "name" },
          { title: "Grade composition", field: "gradeComposition" },
          { title: "Created at", field: "createdAt" },
        ]}
        data={requests}
        actions={[
          {
            icon: () => <InfoIcon color="primary" />,
            tooltip: "Details",

            onClick: (event, rowData) => {
              navigate(
                `/class/${classId}/gradeDetails/${rowData.studentGradeId}`,
                {
                  state: {
                    role: "teacher",
                  },
                }
              );
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        title="Students' Grade Review Requests"
      />
    </Container>
  );
};

export default StudentRequests;

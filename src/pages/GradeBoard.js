import { Container, Button, Stack, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import MaterialTable, {
  MTableCell,
  MTableToolbar,
  MTableEditField,
} from "@material-table/core";
import { Navigate, useParams } from "react-router-dom";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import CellMenu from "../components/CellMenu";
import ColumnHeaderMenu from "../components/ColumnHeaderMenu";
import GradeBoardPrompt from "../components/GradeBoardPrompt";
import DownloadIcon from "@mui/icons-material/Download";

import axiosClient from "../api/axiosClient";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { useDispatch } from "react-redux";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
const Input = styled("input")({
  display: "none",
});
const GradeBoard = () => {
  const dispatch = useDispatch();
  const { classId } = useParams();
  const [role, setRole] = useState(null);
  const [hasStudentList, setHasStudentList] = useState(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await axiosClient.get("/api/classes/" + classId);
      const { userRole } = res.data;
      if (userRole === "teacher") setRole("teacher");
      else setRole("student");
    })();
  }, []);
  useUpdateEffect(() => {
    if (role === "teacher") {
      fetchData();
    }
  }, [role]);
  const fetchRowsOnly = async () => {
    const res = await axiosClient.get(
      "/api/classes/" + classId + "/students-gradeboard"
    );
    const { allStudent, studentGrades } = res.data;
    setData(
      allStudent.map((student, index) => {
        const { fullName, student_id, image } = student;
        const { studentsClasses_id } = studentGrades[index][0];
        let row = {
          studentId: student_id,
          name: fullName,
          studentsClassesId: studentsClasses_id,
        };
        if (typeof image === "string") row.image = image;
        studentGrades[index].forEach((studentGrade) => {
          const { gradeTitle, grade, finalizedGrade } = studentGrade;
          if (gradeTitle) {
            row[gradeTitle] = grade ? grade : 0;
            row[gradeTitle + "Finalized"] = finalizedGrade;
            row[gradeTitle + "Status"] = grade
              ? finalizedGrade === grade
                ? "Finalized"
                : "Drafted"
              : "New";
          } else {
            const { averagePoint } = studentGrade;
            row.average = averagePoint;
          }
          return;
        });
        return row;
      })
    );
  };
  useUpdateEffect(() => {
    setColumns((prev) => {
      const newCols = [...prev];
      newCols.forEach(
        (col) =>
          (col.title = (
            <>
              {col.field}: {col.gradeDetail}
              <ColumnHeaderMenu
                field={col.field}
                gradeStructureId={col.gradeStructureId}
                data={[...data]}
                classId={classId}
                fetchRowsOnly={fetchRowsOnly}
              />
            </>
          ))
      );
      return newCols;
    });
  }, [data]);

  const fetchData = async () => {
    const res = await axiosClient.get(
      "/api/classes/" + classId + "/students-gradeboard"
    );
    const { allStudent } = res.data;
    console.log(res.data);
    if (allStudent.length !== 0) {
      setHasStudentList(true);
      const { gradeStructureList, studentGrades } = res.data;

      setColumns(
        gradeStructureList.map((grade) => {
          return {
            title: (
              <>
                {grade.gradeTitle}: {grade.gradeDetail}
                <ColumnHeaderMenu
                  field={grade.gradeTitle}
                  gradeStructureId={grade.id}
                  data={[...data]}
                  setData={setData}
                  fetchRowsOnly={fetchRowsOnly}
                />
              </>
            ),
            field: grade.gradeTitle,
            type: "numeric",
            width: 200,
            emptyValue: 0,
            gradeStructureId: grade.id,
            gradeDetail: grade.gradeDetail,
            validate: (rowData) => rowData >= 0 && rowData <= 100,
          };
        })
      );
      setData(
        allStudent.map((student, index) => {
          const { fullName, student_id, image } = student;
          const { studentsClasses_id } = studentGrades[index][0];

          let row = {
            studentId: student_id,
            name: fullName,
            studentsClassesId: studentsClasses_id,
          };
          if (typeof image === "string") row.image = image;
          studentGrades[index].forEach((studentGrade) => {
            const { gradeTitle, grade, finalizedGrade } = studentGrade;
            if (gradeTitle) {
              row[gradeTitle] = grade ? grade : 0;
              row[gradeTitle + "Finalized"] = finalizedGrade;
              row[gradeTitle + "Status"] = grade
                ? finalizedGrade === grade
                  ? "Finalized"
                  : "Drafted"
                : "New";
            } else {
              const { averagePoint } = studentGrade;
              row.average = averagePoint;
            }
            return;
          });
          return row;
        })
      );
    } else setHasStudentList(false);
  };

  if (role === null || hasStudentList === null) return <></>;
  if (role === "student") return <Navigate to="/" />;
  if (role === "teacher")
    return (
      <Container
        maxWidth="xl"
        sx={{
          marginTop: 5,
          textAlign: "center",
        }}
      >
        {hasStudentList === false ? (
          <GradeBoardPrompt
            setHasStudentList={setHasStudentList}
            classId={classId}
            fetchData={fetchData}
          />
        ) : (
          <div className="table-container">
            <MaterialTable
              components={{
                Cell: (props) => {
                  const { field } = props.columnDef;
                  if (
                    field === "studentId" ||
                    field === "name" ||
                    field === "average"
                  )
                    return <MTableCell {...props} />;
                  else {
                    const { studentsClassesId } = props.rowData;
                    const { field, gradeStructureId } = props.columnDef;
                    return (
                      <MTableCell {...props} className="custom-cell">
                        <>
                          <CellMenu
                            field={field}
                            studentsClassesId={studentsClassesId}
                            gradeStructureId={gradeStructureId}
                            status={props.rowData[field + "Status"]}
                            fetchRowsOnly={fetchRowsOnly}
                          />
                          <Typography
                            component="span"
                            sx={{
                              color: "text.secondary",
                              fontSize: 13,
                              textAlign: "left",
                            }}
                          >
                            {props.rowData[field + "Status"]}
                            {props.rowData[field + "Status"] === "Drafted" &&
                              props.rowData[field + "Finalized"] && (
                                <Typography
                                  sx={{
                                    fontSize: 11,
                                  }}
                                >
                                  Finalized:{" "}
                                  {props.rowData[field + "Finalized"]}
                                </Typography>
                              )}
                          </Typography>
                        </>
                      </MTableCell>
                    );
                  }
                },
                Toolbar: (props) => (
                  <>
                    <MTableToolbar {...props} />
                    <Stack
                      direction="row"
                      spacing={2}
                      marginLeft={2}
                      marginBottom={1}
                    >
                      <Button
                        variant="contained"
                        component="a"
                        download
                        href="/GradeTemplate.csv"
                        startIcon={<DownloadIcon />}
                      >
                        grade template
                      </Button>
                    </Stack>
                  </>
                ),
                EditField: (props) => {
                  const { columnDef } = props;
                  const newProps = {
                    ...props,
                    columnDef: {
                      ...columnDef,
                      title: columnDef.field,
                    },
                  };
                  return <MTableEditField {...newProps} />;
                },
              }}
              cellEditable={{
                cellStyle: {},
                onCellEditApproved: (
                  newValue,
                  oldValue,
                  rowData,
                  columnDef
                ) => {
                  if (newValue === oldValue)
                    return new Promise((resolve, reject) => resolve());
                  const { studentId, studentsClassesId } = rowData;
                  const { field, gradeStructureId } = columnDef;
                  const newData = [...data];
                  const index = newData.findIndex(
                    (i) => i.studentId === studentId
                  );
                  newData[index][field] = newValue;
                  newData[index][field + "Status"] = "Drafted";
                  return new Promise((resolve, reject) => {
                    axiosClient
                      .post("/api/students-grades/", {
                        studentsClasses_id: studentsClassesId,
                        gradeStructure_id: gradeStructureId,
                        grade: newValue,
                      })
                      .then(({ data }) => {
                        setData(newData);
                        resolve();
                      })
                      .catch((error) => {
                        console.log(error);
                        // if (error.response) {
                        //   dispatch(setErrorMsg(error.response.data.error));
                        // } else console.log(error);
                      });
                  });
                },
              }}
              columns={[
                {
                  title: "Student ID",
                  field: "studentId",
                  editable: "never",
                  width: 150,
                  render: (rowData) => {
                    const { studentId, image } = rowData;
                    if (typeof image === "string") return studentId;
                    else
                      return (
                        <Typography sx={{ color: "text.secondary" }}>
                          {studentId}
                        </Typography>
                      );
                  },
                },
                {
                  title: "Name",
                  field: "name",
                  editable: "never",
                  width: 200,
                  render: (rowData) => {
                    const { name, image } = rowData;
                    if (typeof image === "string") {
                      return (
                        <Stack direction="row" alignItems="center">
                          <Avatar
                            alt={name}
                            src={image}
                            sx={{ width: 30, height: 30, mr: 0.5 }}
                          >
                            {name.charAt(0)}
                          </Avatar>
                          {name}
                        </Stack>
                      );
                    } else
                      return (
                        <Typography sx={{ color: "text.secondary" }}>
                          {name}
                        </Typography>
                      );
                  },
                },
                {
                  title: "Average",
                  field: "average",
                  editable: "never",
                  width: 150,
                },
                ...columns,
              ]}
              data={data}
              title="Grade Board"
              options={{
                rowStyle: {
                  fontFamily: "Roboto",
                },
                exportMenu: [
                  {
                    label: "Export PDF",
                    exportFunc: (cols, datas) => {
                      const newCols = cols.map((col) => {
                        if (typeof col.title === "object") {
                          col.title = col.field;
                        }
                        return col;
                      });
                      return ExportPdf(cols, datas, "GradeBoardPDF");
                    },
                  },
                  {
                    label: "Export CSV",
                    exportFunc: (cols, datas) => {
                      const newCols = cols.map((col) => {
                        if (typeof col.title === "object") {
                          col.title = col.field;
                        }
                        return col;
                      });
                      return ExportCsv(newCols, datas, "GradeBoardCSV");
                    },
                  },
                ],
                tableLayout: "fixed",
                //doubleHorizontalScroll: true,
              }}
            />
          </div>
        )}
      </Container>
    );
};

export default GradeBoard;

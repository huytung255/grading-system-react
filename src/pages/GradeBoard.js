import { Container, Button, Stack, Avatar, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import MaterialTable, {
  MTableToolbar,
  MTableEditField,
} from "@material-table/core";
import { Navigate, useParams } from "react-router-dom";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import GradeBoardPrompt from "../components/Table/GradeBoardPrompt";
import DownloadIcon from "@mui/icons-material/Download";

import axiosClient from "../api/axiosClient";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { useDispatch } from "react-redux";

import {
  refreshColumns,
  processColumns,
  processRows,
} from "../services/tableServices";
import CustomCell from "../components/Table/CustomCell";
const GradeBoard = () => {
  const dispatch = useDispatch();
  const { classId } = useParams();
  const [role, setRole] = useState(null);
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
    processRows(res.data, setData);
  };
  //refresh columns
  useUpdateEffect(() => {
    refreshColumns(data, classId, setColumns, fetchRowsOnly);
  }, [data]);
  const fetchData = async () => {
    const res = await axiosClient.get(
      "/api/classes/" + classId + "/students-gradeboard"
    );
    processColumns(res.data, data, classId, setColumns, fetchRowsOnly);
    processRows(res.data, setData);
  };

  if (role === null) return <></>;
  if (role === "student") return <Navigate to="/" />;
  if (role === "teacher")
    return (
      <Container
        maxWidth="xl"
        sx={{
          marginTop: 5,
          textAlign: "right",
        }}
      >
        <GradeBoardPrompt classId={classId} fetchData={fetchData} />
        <Typography
          sx={{
            textAlign: "left",
            color: "text.secondary",
            fontStyle: "italic",
            fontSize: 13,
          }}
        >
          *Only finalized grades are accounted in average calculations.
        </Typography>
        <div className="table-container">
          <MaterialTable
            components={{
              Cell: (props) => (
                <CustomCell {...props} fetchRowsOnly={fetchRowsOnly} />
              ),
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
                      size="small"
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
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                if (newValue === oldValue)
                  return new Promise((resolve, reject) => resolve());
                const { studentId, studentsClassesId } = rowData;
                const { field, gradeStructureId } = columnDef;
                const newData = [...data];
                const index = newData.findIndex(
                  (i) => i.studentId === studentId
                );
                newData[index][field] = newValue;
                if (newData[index][field + "Finalized"] === newValue)
                  newData[index][field + "Status"] = "Finalized";
                else newData[index][field + "Status"] = "Drafted";

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
                  if (name === "Class average") return name;
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
      </Container>
    );
};

export default GradeBoard;

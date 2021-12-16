import { Container, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import MaterialTable, {
  MTableCell,
  MTableToolbar,
  MTableEditField,
} from "@material-table/core";
import { Navigate, useParams } from "react-router-dom";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import MyMenu from "../components/MyMenu";
import GradeBoardPrompt from "../components/GradeBoardPrompt";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axiosClient from "../api/axiosClient";
const Input = styled("input")({
  display: "none",
});
const GradeBoard = () => {
  const { classId } = useParams();
  const [isTeacher, setIsTeacher] = useState(true);
  const [file, setFile] = useState(null);
  useEffect(() => {
    (async function () {
      const res = await axiosClient.get("/api/classes/" + classId);
      const { userRole } = res.data;
      if (userRole === "teacher") setIsTeacher(true);
      else setIsTeacher(false);
    })();
  }, []);
  // On file select (from the pop up)
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file", file);

    // // Request made to the backend api
    // // Send formData object
    console.log(formData);
  };
  if (!isTeacher) return <Navigate to="/" />;
  else
    return (
      <Container
        maxWidth="xl"
        sx={{
          marginTop: 5,
          textAlign: "center",
        }}
      >
        <GradeBoardPrompt />
        <div className="table-container">
          <MaterialTable
            components={{
              Cell: (props) => {
                const { field } = props.columnDef;
                if (
                  field === "studentId" ||
                  field === "name" ||
                  field === "total"
                )
                  return <MTableCell {...props} />;
                else
                  return (
                    <MTableCell {...props} className="custom-cell">
                      <MyMenu />
                    </MTableCell>
                  );
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
                    <label htmlFor="outlined-button-file">
                      <Input
                        accept=".csv"
                        id="outlined-button-file"
                        multiple
                        type="file"
                        onChange={onFileChange}
                      />
                      <Button
                        variant="outlined"
                        component="span"
                        onClick={onFileUpload}
                        startIcon={<FileUploadIcon />}
                      >
                        upload grade
                      </Button>
                    </label>
                  </Stack>
                </>
              ),
              EditField: (props) => {
                const newProps = { ...props };
                newProps.columnDef.title = newProps.columnDef.field;
                return <MTableEditField {...newProps} />;
              },
            }}
            cellEditable={{
              cellStyle: {},
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  console.log("newValue: " + newValue);
                  setTimeout(resolve, 1000);
                });
              },
            }}
            columns={[
              {
                title: "Student ID",
                field: "studentId",
                editable: "never",
                width: 150,
              },
              {
                title: "Name",
                field: "name",
                editable: "never",
                width: 200,
              },
              {
                title: "Total",
                field: "total",
                type: "numeric",
                editable: "never",
                align: "left",
                width: 200,
              },
              {
                title: (
                  <>
                    Midterm
                    <MyMenu />
                  </>
                ),
                field: "midterm",
                type: "numeric",
                width: 200,
              },
              {
                title: (
                  <>
                    Final
                    <MyMenu />
                  </>
                ),
                field: "final",
                type: "numeric",
                width: 200,
              },
              // {
              //   title: "Final",
              //   field: "final",
              //   type: "numeric",
              //   width: 200,
              // },
              // {
              //   title: "Final",
              //   field: "final",
              //   type: "numeric",
              //   width: 200,
              // },
              // {
              //   title: "Final",
              //   field: "final",
              //   type: "numeric",
              //   width: 200,
              // },
            ]}
            data={[
              {
                studentId: "18120639",
                name: "Mehmet",
                total: 100,
                midterm: 50,
                final: 60,
              },
              {
                studentId: "18120639",
                name: "Mehmet",
                total: 100,
                midterm: 40,
                final: 60,
              },
              {
                studentId: "18120639",
                name: "Mehmet",
                total: 100,
                midterm: 30,
                final: 60,
              },
              {
                studentId: "18120639",
                name: "Mehmet",
                total: 100,
                midterm: 20,
                final: 60,
              },
              {
                studentId: "18120639",
                name: "Mehmet",
                total: 100,
                midterm: 10,
                final: 60,
              },
              {
                studentId: "18120639",
                name: "Mehmet",
                total: 100,
                midterm: 50,
                final: 60,
              },
              {
                studentId: "18120639",
                name: "Mehmet",
                total: 100,
                midterm: 50,
                final: 60,
              },
              {
                studentId: "18120639",
                name: "Mehmet",
                total: 100,
                midterm: 50,
                final: 60,
              },
              {
                studentId: "18120639",
                name: "Mehmet",
                total: 100,
                midterm: 50,
                final: 60,
              },
            ]}
            title="GradeBoard"
            options={{
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

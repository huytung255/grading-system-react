import React, { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axiosClient from "../api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
const Input = styled("input")({
  display: "none",
});
const GradeBoardPrompt = ({ classId, setHasStudentList, fetchData }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  // On file select (from the pop up)
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  // On file upload (click the upload button)
  const onFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosClient.post(
        "/api/files/upload-student-list?classId=" + classId,
        formData
      );
      dispatch(setSuccessMsg(res.data.message));
      fetchData();
      setHasStudentList(true);
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.error));
      } else console.log(error);
    }
  };
  return (
    <>
      <Typography color="secondary" sx={{ marginTop: 4, fontSize: 15 }}>
        Please upload a student list first.
      </Typography>
      <Typography color="secondary" sx={{ fontSize: 15 }}>
        Download the list template below. Upload the filled out list to start
        marking your students.
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        marginTop={4}
        marginBottom={4}
      >
        <Button
          variant="contained"
          component="a"
          download
          href="/StudentListTemplate.csv"
          startIcon={<DownloadIcon />}
        >
          download template
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
            startIcon={<AttachFileIcon />}
          >
            pick file
          </Button>
        </label>
        <Button
          variant="outlined"
          component="span"
          onClick={onFileUpload}
          startIcon={<FileUploadIcon />}
          disabled={file ? false : true}
        >
          upload list
        </Button>
      </Stack>
      {file ? (
        <Typography>Selected file: {file.name}</Typography>
      ) : (
        <Typography>Pick a file before pressing the Upload button</Typography>
      )}
    </>
  );
};

export default GradeBoardPrompt;

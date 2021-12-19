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
const GradeBoardPrompt = ({ classId, fetchData }) => {
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
      await fetchData();
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.error));
      } else console.log(error);
    }
  };
  return (
    <>
      <Typography sx={{ color: "text.secondary", fontSize: 15 }}>
        Upload a student list here.
      </Typography>
      {file ? (
        <Typography sx={{ fontSize: 15 }}>
          Selected file: {file.name}
        </Typography>
      ) : (
        <></>
      )}
      <Stack
        direction="row"
        justifyContent="end"
        spacing={2}
        marginTop={1}
        marginBottom={3}
      >
        <Button
          variant="contained"
          component="a"
          download
          href="/StudentListTemplate.csv"
          startIcon={<DownloadIcon />}
          size="small"
        >
          student list template
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
            size="small"
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
          size="small"
        >
          upload list
        </Button>
      </Stack>
    </>
  );
};

export default GradeBoardPrompt;

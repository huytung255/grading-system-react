import React, { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
const Input = styled("input")({
  display: "none",
});
const GradeBoardPrompt = () => {
  const [file, setFile] = useState(null);
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
  return (
    <>
      <Typography color="secondary" sx={{ marginTop: 4, fontSize: 15 }}>
        Please upload a student list first.
      </Typography>
      <Typography color="secondary" sx={{ fontSize: 15 }}>
        Download the list template below. Upload the filled out list to start
        marking your students.
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2} marginTop={4}>
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
            onClick={onFileUpload}
            startIcon={<FileUploadIcon />}
          >
            upload list
          </Button>
        </label>
      </Stack>
    </>
  );
};

export default GradeBoardPrompt;

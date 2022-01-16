import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosClient from "../../api/axiosClient";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setErrorMsg, setSuccessMsg } from "../../redux/alert";
import CheckIcon from "@mui/icons-material/Check";
const Input = styled("input")({
  display: "none",
});
const ColumnHeaderMenu = ({
  field,
  gradeStructureId,
  data,
  classId,
  fetchRowsOnly,
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const open = Boolean(anchorEl);
  // On file select (from the pop up)
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  // On file upload (click the upload button)
  const onFileUpload = async (event) => {
    event.stopPropagation();
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosClient.post(
        `/api/files/upload-assignment-grade?classId=${classId}&gradeStructure_id=${gradeStructureId}`,
        formData
      );
      dispatch(setSuccessMsg(res.data.message));
      await fetchRowsOnly();
      setFile(null);
      setIsUploading(false);
      setAnchorEl(null);
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.error));
      } else console.log(error);
    }
  };
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const handleFinalizeColumn = async (event) => {
    event.stopPropagation();
    setIsFinalizing(true);
    try {
      await axiosClient.put("/api/students-grades/mark-all-as-finalized", {
        gradeStructure_id: gradeStructureId,
      });
      await fetchRowsOnly();
      // setData((prev) => {
      //   const newData = [...prev];
      //   newData.forEach((row) => (row[field + "Status"] = "Finalized"));
      //   return newData;
      // });
    } catch (error) {
      console.log(error);
    }
    setIsFinalizing(false);
    setAnchorEl(null);
  };
  const removeFile = (event) => {
    event.stopPropagation();
    setFile(null);
  };
  let canFinalize = true;
  if (data.every((row) => row[field + "Status"] !== "Drafted")) {
    canFinalize = false;
  }
  // if (data.some((row) => row[field + "Status"] === "New")) {
  //   canFinalize = false;
  // }
  // else
  // if (
  //   data
  //     .filter((row) => row.studentId !== "")
  //     .every((row) => row[field + "Status"] === "Finalized")
  // ) {
  //   canFinalize = false;
  // }
  return (
    <>
      <IconButton color="primary" size="small" onClick={handleClick}>
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {file && (
          <MenuItem onClick={removeFile} disabled={isUploading || isFinalizing}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText> {file.name}</ListItemText>
          </MenuItem>
        )}
        {file && (
          <MenuItem
            onClick={onFileUpload}
            disabled={isUploading || isFinalizing}
          >
            <ListItemIcon>
              {isUploading ? (
                <CircularProgress size={17} />
              ) : (
                <FileUploadIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>Upload grade</ListItemText>
          </MenuItem>
        )}

        <label htmlFor="menu-file">
          <Input
            accept=".csv"
            id="menu-file"
            multiple
            type="file"
            onChange={onFileChange}
            onClick={(event) => event.stopPropagation()}
          />
          <MenuItem
            onClick={(event) => event.stopPropagation()}
            disabled={isUploading || isFinalizing}
          >
            <ListItemIcon>
              <AttachFileIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Pick file</ListItemText>
          </MenuItem>
        </label>
        <MenuItem
          onClick={handleFinalizeColumn}
          disabled={!canFinalize || isUploading || isFinalizing}
        >
          <ListItemIcon>
            {isFinalizing ? <CircularProgress size={17} /> : <CheckIcon />}
          </ListItemIcon>
          <ListItemText>Finalize column</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ColumnHeaderMenu;

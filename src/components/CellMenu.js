import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosClient from "../api/axiosClient";
const CellMenu = ({
  field,
  studentsClassesId,
  gradeStructureId,
  status,
  fetchRowsOnly,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleFinalize = async (event) => {
    event.stopPropagation();
    setIsFinalizing(true);
    try {
      await axiosClient.put("/api/students-grades/mark-as-finalized", {
        studentsClasses_id: studentsClassesId,
        gradeStructure_id: gradeStructureId,
      });
      await fetchRowsOnly();
      // setData((prev) => {
      //   const newData = [...prev];
      //   const index = newData.findIndex(
      //     (i) => i.studentsClassesId === studentsClassesId
      //   );
      //   newData[index][field + "Status"] = "Finalized";
      //   return newData;
      // });
    } catch (error) {
      console.log(error);
    }
    setIsFinalizing(false);
    setAnchorEl(null);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
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
        <MenuItem
          onClick={handleFinalize}
          disabled={
            status === "Finalized" ||
            status === "New" ||
            status === "Reviewed" ||
            isFinalizing
          }
        >
          <ListItemIcon>
            {isFinalizing ? <CircularProgress size={17} /> : <CheckIcon />}
          </ListItemIcon>
          <ListItemText>Finalize</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CellMenu;

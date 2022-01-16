import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Controller, useForm } from "react-hook-form";
import axiosClient from "../../api/axiosClient";
import { useDispatch } from "react-redux";
import { setErrorMsg, setSuccessMsg } from "../../redux/alert";
import { convertToDateAndTime } from "../../services/dateTimeServices";
const ReviewTable = ({ studentGradeId, role, data, setData }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.put(
        "/api/students-grades/mark-as-final-decision",
        {
          studentGrade_Id: studentGradeId,
          grade: data.editValue,
        }
      );
      setData((prev) => ({
        ...prev,
        finalizedGrade: data.editValue,
        finalDecision: data.editValue,
      }));
      setIsEditing(false);
      dispatch(setSuccessMsg("Final grade is decided."));
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  };
  const openEdit = () => setIsEditing(true);
  const closeEdit = () => {
    setIsEditing(false);
  };
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
              component="th"
              scope="row"
              width={140}
              sx={{ fontWeight: 500 }}
            >
              Created At
            </TableCell>
            <TableCell component="th" scope="row">
              {convertToDateAndTime(new Date(data.createdAt))}
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
              component="th"
              scope="row"
              width={140}
              sx={{ fontWeight: 500 }}
            >
              Expected grade
            </TableCell>
            <TableCell component="th" scope="row">
              {data.expectedGrade}
            </TableCell>
          </TableRow>

          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
              component="th"
              scope="row"
              width={140}
              sx={{ fontWeight: 500 }}
            >
              Explanation
            </TableCell>
            <TableCell component="th" scope="row">
              {data.explanation}
            </TableCell>
          </TableRow>

          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
              component="th"
              scope="row"
              width={140}
              sx={{ fontWeight: 500 }}
            >
              Final decision
            </TableCell>
            <TableCell component="th" scope="row">
              {isEditing ? (
                <Stack
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  flexDirection="row"
                  alignItems="center"
                >
                  <Controller
                    name="editValue"
                    control={control}
                    defaultValue={data.finalDecision ? data.finalDecision : 0}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                      pattern: "[0-9]",
                      max: 100,
                      min: 0,
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.editValue}
                          type="number"
                          variant="standard"
                          size="small"
                          margin="dense"
                          required={true}
                          {...field}
                        />
                      );
                    }}
                  />
                  <IconButton type="submit" size="small" sx={{ ml: 1 }}>
                    <CheckIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton size="small" sx={{ ml: 1 }} onClick={closeEdit}>
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              ) : data.finalDecision ? (
                data.finalDecision
              ) : (
                role === "teacher" && (
                  <IconButton size="small" onClick={openEdit}>
                    <EditIcon fontSize="inherit" color="primary" />
                  </IconButton>
                )
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewTable;

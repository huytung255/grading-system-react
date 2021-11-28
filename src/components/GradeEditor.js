import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { Paper, Stack, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

const GradeEditor = ({ grade, provided, index, setGradeStructure }) => {
  const firstRenderRef = useRef(true);
  const [title, setTitle] = useState(grade.title);
  const [percentage, setPercentage] = useState(grade.percentage);

  useLayoutEffect(() => {
    setTitle(grade.title);
    setPercentage(grade.percentage);
  }, [grade]);

  useEffect(() => {
    //prevent 1st render
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    setGradeStructure((prev) => {
      const newGradeStructure = [...prev];
      newGradeStructure[index] = {
        title: title,
        percentage: percentage,
      };
      return newGradeStructure;
    });
  }, [title, percentage]);
  const handlePercentageChange = (e) => {
    let newVal = e.target.value;
    if (/^\d*\.?\d*$/.test(newVal)) {
      setPercentage(Number(newVal));
    }
  };
  const handleDelete = () => {
    setGradeStructure((prev) => {
      const newGradeStructure = [...prev];
      newGradeStructure.splice(index, 1);
      return newGradeStructure;
    });
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        mb: 2,
        bgcolor: "#fafafa",
      }}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Stack direction="row" spacing={1}>
        <TextField
          variant="standard"
          size="small"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          variant="standard"
          size="small"
          label="Percentage"
          value={percentage}
          type="number"
          onChange={handlePercentageChange}
          fullWidth
        />

        <Button
          disableElevation
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 50 }}
          onClick={handleDelete}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      </Stack>
    </Paper>
  );
};

export default GradeEditor;

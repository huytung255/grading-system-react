import React from "react";
import {
  Container,
  Stack,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GradeEditor from "../components/GradeEditor";
const EditGradeStructure = () => {
  const [gradeStructure, setGradeStructure] = useState([
    {
      title: "Midterm",
      percentage: 40,
    },
    {
      title: "Final",
      percentage: 60,
    },
    {
      title: "AFinal",
      percentage: 70,
    },
  ]);
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const newGradeStructure = [...gradeStructure];
    const [reorderedGrade] = newGradeStructure.splice(result.source.index, 1);
    newGradeStructure.splice(result.destination.index, 0, reorderedGrade);
    setGradeStructure(newGradeStructure);
  }
  const addNew = () => {
    const newGradeStructure = [...gradeStructure];
    newGradeStructure.push({
      title: "",
      percentage: 0,
    });
    setGradeStructure(newGradeStructure);
  };
  return (
    <Container
      sx={{
        marginTop: 5,
      }}
      maxWidth="sm"
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 1 }}>
          Edit Grade Structure
        </Typography>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="grades">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {gradeStructure.map((grade, i) => {
                  return (
                    <Draggable key={i} draggableId={i.toString()} index={i}>
                      {(provided) => (
                        <GradeEditor
                          key={i}
                          grade={grade}
                          // ref={provided.innerRef}
                          provided={provided}
                          index={i}
                          setGradeStructure={setGradeStructure}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <Stack direction="row" spacing={2} marginTop={1}>
          <Button fullWidth variant="contained" onClick={addNew}>
            <AddCircleIcon />
          </Button>
          <Button
            color="success"
            fullWidth
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default EditGradeStructure;

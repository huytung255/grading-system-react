import React, { useEffect } from "react";
import { Container, Stack, Button, Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GradeEditor from "../components/GradeEditor";
import axiosClient from "../api/axiosClient";
import { useDispatch } from "react-redux";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import LoadingButton from "@mui/lab/LoadingButton";
const EditGradeStructure = () => {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [gradeStructure, setGradeStructure] = useState([]);
  async function fetchAPI() {
    try {
      const res = await axiosClient.get(
        "/api/classes/" + classId + "/grade-structure"
      );
      if (res.data.length !== 0) setIsEditing(true);
      setGradeStructure(
        res.data.map((grade) => {
          return {
            id: grade.id,
            title: grade.gradeTitle,
            percentage: Number(grade.gradeDetail),
          };
        })
      );
    } catch (error) {
      if (error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newGradeStructure = [...gradeStructure];
    console.log(newGradeStructure);
    const [reorderedGrade] = newGradeStructure.splice(result.source.index, 1);
    newGradeStructure.splice(result.destination.index, 0, reorderedGrade);
    console.log(newGradeStructure);
    setGradeStructure(newGradeStructure);
  };
  const addNew = () => {
    const newGradeStructure = [...gradeStructure];
    newGradeStructure.push({
      id: undefined,
      title: "",
      percentage: 0,
    });
    setGradeStructure(newGradeStructure);
  };
  const handleSave = async () => {
    //Create
    const checkValid = gradeStructure.every((grade) => grade.title !== "");
    if (checkValid) {
      if (!isEditing) {
        try {
          setIsSaving(true);
          const dataToSend = gradeStructure.map((grade) => {
            return {
              gradeTitle: grade.title,
              gradeDetail: grade.percentage.toString(),
            };
          });
          const res = await axiosClient.post(
            "/api/classes/" + classId + "/grade-structure",
            {
              data: dataToSend,
            }
          );
          setIsSaving(false);
          dispatch(setSuccessMsg(res.data.message));
        } catch (error) {
          if (error.response.data.message) {
            dispatch(setErrorMsg(error.response.data.message));
          } else console.log(error);
        }
      }
      //Update
      else {
        try {
          setIsSaving(true);
          const dataToSend = gradeStructure.map((grade) => {
            return {
              id: grade.id,
              gradeTitle: grade.title,
              gradeDetail: grade.percentage.toString(),
            };
          });
          const res = await axiosClient.put(
            "/api/classes/" + classId + "/grade-structure",
            {
              data: dataToSend,
            }
          );
          setIsSaving(false);
          dispatch(setSuccessMsg(res.data.message));
        } catch (error) {
          if (error.response.data.message) {
            dispatch(setErrorMsg(error.response.data.message));
          } else console.log(error);
        }
      }
      navigate("/class/" + classId + "/feed");
    } else {
      dispatch(setErrorMsg("Titles are required!"));
    }
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
                          classId={classId}
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
          <LoadingButton
            loading={isSaving}
            color="success"
            fullWidth
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default EditGradeStructure;

//import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
// import axiosClient from "../api/axiosClient";
// import AddNewModal from "../components/AddNewModal";
// import ClassCard from "../components/ClassCard";
// import { setErrorMsg } from "../redux/alert";
// import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const getItemStyle = (draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  marginBottom: "15px",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const ClassGradeStructure = () => {
  const [items, setItems] = useState([...Array(6)].map((e, i) => i + 1));

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    console.log(`${result.source.index} -> ${result.destination.index}`);
    const reOrderitems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(reOrderitems);
    console.log(reOrderitems);
  };

  return (
    <Box mt={3}>
      <Container maxWidth="md">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ listStyleType: "none" }}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item}
                    draggableId={`${item}th element`}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(provided.draggableProps.style)}
                      >
                        <Paper
                          sx={{
                            height: "60px",
                            width: "100%",
                            color: "#eaeef3",
                          }}
                          elevation={3}
                        >{`${item} element`}</Paper>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Box>
  );
};

export default ClassGradeStructure;

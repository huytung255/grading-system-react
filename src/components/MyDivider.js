import React from "react";
import { Box, Typography } from "@mui/material";
const MyDivider = ({ text }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          borderStyle: "solid",
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: "text.secondary",
          flex: 1,
          alignSelf: "center",
          marginRight: 2,
        }}
      ></Box>
      <Typography component="p" variant="p" color="text.secondary">
        {text}
      </Typography>
      <Box
        sx={{
          borderStyle: "solid",
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: "text.secondary",
          flex: 1,
          alignSelf: "center",
          marginLeft: 2,
        }}
      ></Box>
    </Box>
  );
};

export default MyDivider;

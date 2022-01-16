import { Avatar, Stack, Typography, Box } from "@mui/material";
import React from "react";
import { convertToDateAndTime } from "../../services/dateTimeServices";
const Comment = ({ name, image, content, createdAt }) => {
  const formattedDate = convertToDateAndTime(new Date(createdAt));
  return (
    <Stack flexDirection="row" mb={2}>
      <Avatar alt="name" src={image} sx={{ width: 35, height: 35, mr: 2 }}>
        {name.charAt(0)}
      </Avatar>
      <Box>
        <Typography fontSize={15} marginBottom={0.25} fontWeight={500}>
          {name + " • " + formattedDate}
        </Typography>
        <Typography variant="p">{content}</Typography>
      </Box>
    </Stack>
  );
};

export default Comment;

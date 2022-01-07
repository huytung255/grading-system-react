import { Avatar, Stack, Typography, Box } from "@mui/material";
import React from "react";
const Comment = ({ name, image, content, createdAt }) => {
  return (
    <Stack flexDirection="row" mb={2}>
      <Avatar alt="name" src={image} sx={{ width: 35, height: 35, mr: 2 }}>
        {name.charAt(0)}
      </Avatar>
      <Box>
        <Typography fontSize={15} marginBottom={0.25} fontWeight={500}>
          {name}
        </Typography>
        <Typography variant="p">{content}</Typography>
      </Box>
    </Stack>
  );
};

export default Comment;

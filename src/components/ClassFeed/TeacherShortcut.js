import React, { useState } from "react";
import { Paper, Box, Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const TeacherShortcut = ({ classId }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        pt: 2,
        pl: 2,
        pb: 2,
        pr: 2,
        mb: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 35,
          height: 35,
          backgroundColor: "primary.main",
          borderRadius: "50%",
        }}
      >
        <FormatListBulletedIcon
          sx={{ fill: "#FFFFFF", fontSize: 20 }}
          fontSize="inherit"
        />
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "text.primary",
          ml: 2,
          flex: 1,
        }}
      >
        View your students' grade review requests
      </Typography>

      <Button
        component={Link}
        to={`/class/${classId}/studentRequests`}
        variant="contained"
        size="small"
        sx={{ ml: "auto" }}
      >
        view
      </Button>
    </Paper>
  );
};

export default TeacherShortcut;

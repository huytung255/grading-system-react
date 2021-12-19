import React from "react";
import { Paper, Box, Stack, Typography, Button } from "@mui/material";
import GradingIcon from "@mui/icons-material/Grading";
const StudentGrade = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        paddingTop: 2,
        paddingLeft: 3,
        paddingBottom: 2,
        paddingRight: 3,
        mb: 3,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 45,
          height: 45,
          backgroundColor: "primary.main",
          borderRadius: "50%",
        }}
      >
        <GradingIcon sx={{ fill: "#FFFFFF" }} />
      </Box>

      <Stack direction="column" marginLeft={2}>
        <Typography
          sx={{ fontSize: 14, fontWeight: 500, color: "text.primary" }}
        >
          Midterm
        </Typography>
        <Typography sx={{ fontWeight: 500, color: "text.primary" }}>
          Grade: 8
        </Typography>
      </Stack>
      <Button variant="contained" size="small" sx={{ ml: "auto" }}>
        request review
      </Button>
    </Paper>
  );
};

export default StudentGrade;

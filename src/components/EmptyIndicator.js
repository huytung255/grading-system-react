import React from "react";
import { Paper, Typography } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
const EmptyIndicator = ({ msg }) => {
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
        flexDirection: "column",
      }}
      variant="outlined"
      elevation={0}
    >
      <PriorityHighIcon sx={{ color: "primary.main" }} color="inherit" />
      <Typography
        sx={{
          fontSize: 14,
          color: "text.secondary",
        }}
      >
        {msg ? msg : "Nothing here yet."}
      </Typography>
    </Paper>
  );
};

export default EmptyIndicator;

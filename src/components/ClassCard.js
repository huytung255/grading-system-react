import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
const ClassCard = ({ name, section }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "primary",
        borderRadius: 3,
        borderLeftWidth: 10,
        borderLeftColor: "primary.main",
        bgcolor: "text.primary",
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{ minHeight: 100, display: "flex", flexDirection: "column" }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              color: "white",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.5)",
              marginTop: "auto",
            }}
          >
            {section}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClassCard;

import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const ClassCard = ({ name, section, id }) => {
  let navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderLeftWidth: 10,
        borderLeftColor: "primary.main",
        bgcolor: "text.primary",
        position: "relative",
      }}
    >
      <Link
        to={"/class/" + id + "/feed"}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      ></Link>
      <CardContent
        sx={{ height: 150, display: "flex", flexDirection: "column" }}
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
    </Card>
  );
};

export default ClassCard;

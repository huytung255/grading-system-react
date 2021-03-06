import { Box } from "@mui/system";
import React from "react";
const RoleBadge = ({ role }) => {
  return (
    <Box
      sx={{
        borderWidth: 0,
        position: "absolute",
        color: "primary.main",
        fontWeight: "bold",
        fontSize: 10,
        padding: "1px 10px 1px 15px",
        textTransform: "capitalize",
        overflow: "hidden",
        top: 0,
        right: 0,
        zIndex: 2,
        "&::before": {
          backgroundColor: "white",
          position: "absolute",
          content: '""',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          transform: "skew(22deg)",
          transformOrigin: "50% 0",
          zIndex: -1,
        },
      }}
    >
      {role}
    </Box>
  );
};
export default RoleBadge;

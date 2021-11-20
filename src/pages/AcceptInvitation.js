import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const AcceptInvitation = () => {
  const navigate = useNavigate();
  const query = useQuery();
  useEffect(() => {
    const classId = query.get("classID");
    const itcode = query.get("itcode");
    let timer1 = setTimeout(
      () => navigate("/class/" + classId + "/feed"),
      1500
    );
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      paddingTop={5}
      position="absolute"
      top={0}
      zIndex={10}
    >
      <CircularProgress color="primary" size={100} />
      <Typography
        variant="h5"
        sx={{ marginTop: 5, color: "primary.main", fontWeight: "700" }}
      >
        You are being enrolled to the class...
      </Typography>
    </Stack>
  );
};

export default AcceptInvitation;

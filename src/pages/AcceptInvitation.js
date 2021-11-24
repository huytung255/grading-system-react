import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { setErrorMsg, setSuccessMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
import axiosClient from "../api/axiosClient";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const AcceptInvitation = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch();
  async function joinClass(classId, type, code) {
    try {
      const res = await axiosClient.get(
        "/api/classes/" + classId + "/join?" + type + "=" + code
      );
      dispatch(setSuccessMsg(res.data.message));
      navigate("/class/" + classId + "/feed");
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    const classId = query.get("classID");
    const tjc = query.get("tjc");
    const sjc = query.get("sjc");
    if (tjc) {
      joinClass(classId, "tjc", tjc);
    } else if (sjc) {
      joinClass(classId, "sjc", sjc);
    }
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

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setIsError, resetError } from "../redux/alert";
const MyAlert = React.forwardRef(function MyAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar() {
  const dispatch = useDispatch();
  const { isError, errorMsg, errorKey } = useSelector((state) => state.alert);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setIsError(false));
  };
  const handleExited = () => {
    dispatch(resetError(""));
  };
  return (
    <Snackbar
      key={errorKey}
      open={isError}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      <MyAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorMsg}
      </MyAlert>
    </Snackbar>
  );
}

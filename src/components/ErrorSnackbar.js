import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setIsError, resetError } from "../redux/alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorMsg}
      </Alert>
    </Snackbar>
  );
}

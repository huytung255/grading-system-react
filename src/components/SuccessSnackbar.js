import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setIsSuccess, resetSuccess } from "../redux/alert";
const MyAlert = React.forwardRef(function MyAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessSnackbar() {
  const dispatch = useDispatch();
  const { isSuccess, successMsg, successKey } = useSelector(
    (state) => state.alert
  );
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setIsSuccess(false));
  };
  const handleExited = () => {
    dispatch(resetSuccess(""));
  };
  return (
    <Snackbar
      key={successKey}
      open={isSuccess}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      <MyAlert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {successMsg}
      </MyAlert>
    </Snackbar>
  );
}

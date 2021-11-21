import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setIsSuccess } from "../redux/alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessSnackbar() {
  const dispatch = useDispatch();
  const { isSuccess, successMsg } = useSelector((state) => state.alert);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setIsSuccess(false));
  };

  return (
    <Snackbar open={isSuccess} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {successMsg}
      </Alert>
    </Snackbar>
  );
}

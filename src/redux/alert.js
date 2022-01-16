import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  isSuccess: false,
  errorMsg: "",
  successMsg: "",
  errorKey: "",
  successKey: "",
};
export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload.toString();
      state.errorKey = new Date().getTime();
      state.isError = true;
    },
    setSuccessMsg: (state, action) => {
      state.successMsg = action.payload.toString();
      state.errorKey = new Date().getTime();
      state.isSuccess = true;
    },
    resetError: (state, action) => {
      state.errorMsg = action.payload;
    },
    resetSuccess: (state, action) => {
      state.successMsg = action.payload;
    },
  },
});
export const {
  setIsError,
  setIsSuccess,
  setErrorMsg,
  setSuccessMsg,
  resetError,
  resetSuccess,
} = alertSlice.actions;
export default alertSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  userId: localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});
export const { setIsAuthenticated, setToken, setUserId } = userSlice.actions;
export default userSlice.reducer;

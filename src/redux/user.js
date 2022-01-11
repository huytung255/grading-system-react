import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light",
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
    switchTheme: (state, action) => {
      if (state.theme === "light") state.theme = "dark";
      else state.theme = "light";
    },
  },
});
export const { setIsAuthenticated, setToken, setUserId, switchTheme } =
  userSlice.actions;
export default userSlice.reducer;

import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/Authentication/RequireAuth";
import ClassFeed from "./pages/ClassFeed";
import ClassParticipants from "./pages/ClassParticipants";
import AcceptInvitation from "./pages/AcceptInvitation";
import RequireSignOut from "./components/Authentication/RequireSignOut";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ErrorSnackbar from "./components/Snackbars/ErrorSnackbar";
import SuccessSnackbar from "./components/Snackbars/SuccessSnackbar";
import Profile from "./pages/Profile";
import NewPassword from "./pages/NewPassword";
import EditGradeStructure from "./pages/EditGradeStructure";
import GradeBoard from "./pages/GradeBoard";
import GradeDetails from "./pages/GradeDetails";
import StudentRequests from "./pages/StudentRequests";
import StudentShortenedGrade from "./pages/StudentShortenedGrade";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
function App() {
  const { theme } = useSelector((state) => state.user);
  const customTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        light: "#4fb3bf",
        main: "#00838f",
        dark: "#005662",
        contrastText: "#fff",
      },
      secondary: {
        light: "#819ca9",
        main: "#546e7a",
        dark: "#29434e",
        contrastText: "#fff",
      },
    },
  });
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <ErrorSnackbar />
      <SuccessSnackbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/class/:classId/feed"
            element={
              <RequireAuth>
                <ClassFeed />
              </RequireAuth>
            }
          />
          <Route
            path="/class/:classId/feed/edit-grade-structure"
            element={
              <RequireAuth>
                <EditGradeStructure />
              </RequireAuth>
            }
          />
          <Route
            path="/class/:classId/participants"
            element={
              <RequireAuth>
                <ClassParticipants />
              </RequireAuth>
            }
          />
          <Route
            path="/class/:classId/gradeBoard"
            element={
              <RequireAuth>
                <GradeBoard />
              </RequireAuth>
            }
          />
          <Route
            path="/class/:classId/gradeDetails/:studentGradeId"
            element={
              <RequireAuth>
                <GradeDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/class/:classId/studentRequests"
            element={
              <RequireAuth>
                <StudentRequests />
              </RequireAuth>
            }
          />
          <Route
            path="/class/:classId/studentGrades/:studentId"
            element={
              <RequireAuth>
                <StudentShortenedGrade />
              </RequireAuth>
            }
          />
          <Route
            path="/user-profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/sign-in"
            element={
              <RequireSignOut>
                <SignIn />
              </RequireSignOut>
            }
          />
          <Route
            path="/sign-up"
            element={
              <RequireSignOut>
                <SignUp />
              </RequireSignOut>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RequireSignOut>
                <ForgotPassword />
              </RequireSignOut>
            }
          />
          <Route
            path="/reset-password"
            element={
              <RequireSignOut>
                <NewPassword />
              </RequireSignOut>
            }
          />
          <Route
            path="/accept-invitation"
            element={
              <RequireAuth>
                <AcceptInvitation />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import ClassFeed from "./pages/ClassFeed";
import ClassParticipants from "./pages/ClassParticipants";
import AcceptInvitation from "./pages/AcceptInvitation";
function App() {
  const theme = createTheme({
    palette: {
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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* {["/", "class"].map((p, i) => (
            <Route
              key={i}
              path={p}
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          ))} */}
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
            path="/class/:classId/participants"
            element={
              <RequireAuth>
                <ClassParticipants />
              </RequireAuth>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
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

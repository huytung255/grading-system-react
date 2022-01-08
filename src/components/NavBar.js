import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import classNav from "../constants/classNav";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import {
  NavLink,
  matchPath,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import { setIsAuthenticated } from "../redux/user";
import { useDispatch } from "react-redux";
import NavDrawer from "./NavDrawer";
import Notifications from "./Notifications";
const NavBar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { classId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    localStorage.clear();
    dispatch(setIsAuthenticated(false));
    navigate("/sign-in");
  };
  let match = matchPath("/class/:id/*", location.pathname.toString());
  if (match) {
    (async function () {
      const res = await axiosClient.get("/api/classes/" + classId);
      const { userRole } = res.data;
      if (userRole === "teacher") setIsTeacher(true);
      else setIsTeacher(false);
    })();
  }
  const activeStyle = {
    borderBottomStyle: "solid",
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: "5px",
    display: "flex",
    alignItems: "center",
    paddingRight: "20px",
    paddingLeft: "20px",
    textDecoration: "none",
    color: "inherit",
  };
  const inactiveStyle = {
    display: "flex",
    alignItems: "center",
    paddingRight: "20px",
    paddingLeft: "20px",
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {match ? <NavDrawer isTeacher={isTeacher} classId={classId} /> : <></>}

        <NavLink
          to="/"
          style={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="h6" component="div">
            Grading System
          </Typography>
        </NavLink>

        {match ? (
          <Stack
            direction="row"
            flexGrow={1}
            height="100%"
            position="absolute"
            sx={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              display: { xs: "none", lg: "flex" },
            }}
          >
            {classNav.map((item, i) => {
              const { url, name, role } = item;
              if (role === "teacher" && !isTeacher)
                return <React.Fragment key={i}></React.Fragment>;
              return (
                <NavLink
                  key={i}
                  to={"/class/" + classId + url}
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  <Typography sx={{ fontWeight: 500 }}>{name}</Typography>
                </NavLink>
              );
            })}
          </Stack>
        ) : (
          <></>
        )}

        <Notifications />
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <NavLink
              to="/user-profile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem onClick={signOut}>Sign out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

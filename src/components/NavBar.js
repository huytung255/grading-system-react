import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import {
  NavLink,
  matchPath,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import { setIsAuthenticated } from "../redux/user";
import { useDispatch } from "react-redux";
const NavBar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { classId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
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
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
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
            sx={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
          >
            <NavLink
              to={"/class/" + classId + "/feed"}
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <Typography sx={{ fontWeight: 500 }}>Feed</Typography>
            </NavLink>
            <NavLink
              to={"/class/" + classId + "/participants"}
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <Typography sx={{ fontWeight: 500 }}>Participants</Typography>
            </NavLink>
          </Stack>
        ) : (
          <></>
        )}

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
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={signOut}>Sign out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

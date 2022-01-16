import {
  Drawer,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import classNav from "../../constants/classNav";
import React, { useState } from "react";
const NavDrawer = ({ classId, isTeacher }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setOpenDrawer(open);
  };
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, display: { xs: "flex", lg: "none" } }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {classNav.map((item, i) => {
              const { url, name, icon, role } = item;
              if (role === "teacher" && !isTeacher)
                return <React.Fragment key={i}></React.Fragment>;
              return (
                <ListItem
                  key={i}
                  component={Link}
                  to={"/class/" + classId + url}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    primary={name}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 500,
                        textDecoration: "none",
                      },
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavDrawer;

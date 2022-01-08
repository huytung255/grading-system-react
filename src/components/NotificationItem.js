import React from "react";
import { MenuItem, Stack, Typography } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const LINES_TO_SHOW = 3;

// src: https://stackoverflow.com/a/13924997/8062659
const MultiLineEllipsis = styled(Typography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: LINES_TO_SHOW.toString(),
  WebkitBoxOrient: "vertical",
}));

const NotificationItem = ({ isNew, content, createdAt, handleCloseNoti }) => {
  let navigate = useNavigate();
  const handleItemClick = () => {
    navigate("/class/1/feed");
    handleCloseNoti();
  };
  return (
    <MenuItem sx={{ minHeight: 75 }} onClick={handleItemClick} divider>
      {isNew ? (
        <NotificationsActiveIcon sx={{ mr: 2 }} color="primary" />
      ) : (
        <NotificationsIcon
          sx={{ mr: 2, color: "text.secondary" }}
          color="inherit"
        />
      )}

      <Stack flex={1}>
        <MultiLineEllipsis
          fontSize={13}
          sx={{
            fontWeight: "400",
            wordBreak: "break-all",
            whiteSpace: "normal",
            color: isNew ? "text.primary" : "text.secondary",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            // lineClamp: 2,
          }}
        >
          {content}
        </MultiLineEllipsis>
        <Typography
          fontSize={12}
          sx={{
            wordBreak: "break-all",
            whiteSpace: "normal",
            color: isNew ? "primary.main" : "text.secondary",
          }}
        >
          {createdAt}
        </Typography>
      </Stack>
    </MenuItem>
  );
};

export default NotificationItem;

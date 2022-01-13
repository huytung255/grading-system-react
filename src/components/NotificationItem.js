import React, { useState } from "react";
import { MenuItem, Stack, Typography } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { convertToDateAndTime } from "../services/dateTimeServices";
import axiosClient from "../api/axiosClient";
const LINES_TO_SHOW = 3;

// src: https://stackoverflow.com/a/13924997/8062659
const MultiLineEllipsis = styled(Typography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: LINES_TO_SHOW.toString(),
  WebkitBoxOrient: "vertical",
}));

const NotificationItem = ({
  id,
  IsSeen,
  content,
  createdAt,
  handleCloseNoti,
  class_id,
}) => {
  let navigate = useNavigate();
  const handleItemClick = async () => {
    navigate(`/class/${class_id}/feed`);
    try {
      const res = await axiosClient.put("/api/notifications", {
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
    //setIsSeen(true);
    handleCloseNoti(id);
  };
  const formattedDate = convertToDateAndTime(new Date(createdAt));
  return (
    <MenuItem sx={{ minHeight: 75 }} onClick={handleItemClick} divider>
      {!IsSeen ? (
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
            wordBreak: "break-word",
            whiteSpace: "normal",
            color: !IsSeen ? "text.primary" : "text.secondary",
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
            color: !IsSeen ? "primary.main" : "text.secondary",
          }}
        >
          {formattedDate}
        </Typography>
      </Stack>
    </MenuItem>
  );
};

export default NotificationItem;

import React, { useEffect, useState } from "react";
import {
  Menu,
  IconButton,
  Badge,
  Box,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationItem from "./NotificationItem";
import { useRef } from "react";
const dummyNoti = {
  isNew: true,
  content: "Your Midterm grade has been marked by a teacher in New Class",
  createdAt: "Fri 26th May",
};
const dummyFetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = [];
      for (let i = 0; i < 5; i++) res.push({ ...dummyNoti });
      resolve(res);
    }, 1500);
  });
};
const Notifications = () => {
  const progressRef = useRef();
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const [shouldLoadMore, setShouldLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const handleNoti = (event) => {
    setAnchorElNoti(event.currentTarget);
  };
  const handleCloseNoti = () => {
    setAnchorElNoti(null);
    setList((prev) => {
      const newList = prev.map(({ content, createdAt }) => ({
        isNew: false,
        content,
        createdAt,
      }));
      return newList;
    });
  };
  const scrollToBottom = () => {
    progressRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const fetchMore = async () => {
    setIsLoading(true);
    const res = await dummyFetch();
    setList([...list, ...res]);
    setIsLoading(false);
  };
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && shouldLoadMore) {
      fetchMore();
    }
  };
  useEffect(() => {
    if (isLoading === true) scrollToBottom();
  }, [isLoading]);
  useEffect(() => {
    if (list.length === 15) setShouldLoadMore(false);
  }, [list]);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await dummyFetch();
      setList([...res]);
      setIsLoading(false);
    };

    fetch();
  }, []);
  return (
    <>
      <IconButton color="inherit" onClick={handleNoti}>
        <Badge variant="dot" color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorElNoti}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorElNoti)}
        onClose={handleCloseNoti}
        PaperProps={{
          style: {
            height: 400,
            width: 300,
          },
          onScroll: handleScroll,
        }}
      >
        <MenuItem
          sx={{
            fontWeight: 500,
            justifyContent: "center",
            fontSize: 14,
          }}
          disabled
          divider
        >
          Notifications
        </MenuItem>
        {list.map((noti, i) => (
          <NotificationItem
            key={i}
            {...noti}
            handleCloseNoti={handleCloseNoti}
          />
        ))}
        {list.length === 0 && !shouldLoadMore && (
          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
              color: "text.secondary",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            You have no notifications.
          </Typography>
        )}
        {isLoading && (
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 1 }}
            ref={progressRef}
          >
            <CircularProgress color="primary" size={20} />
          </Box>
        )}
      </Menu>
    </>
  );
};

export default Notifications;

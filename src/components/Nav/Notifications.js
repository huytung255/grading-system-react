import React, { useEffect, useState } from "react";
import {
  Menu,
  IconButton,
  Badge,
  Box,
  MenuItem,
  Typography,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationItem from "./NotificationItem";
import { useRef } from "react";
import axiosClient from "../../api/axiosClient";
import { setErrorMsg } from "../../redux/alert";
import { useDispatch } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
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
  const dispatch = useDispatch();
  const progressRef = useRef();
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const [shouldLoadMore, setShouldLoadMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const handleNoti = (event) => {
    setAnchorElNoti(event.currentTarget);
  };
  const handleCloseNoti = (id) => {
    setAnchorElNoti(null);
    const newList = list.map(({ IsSeen, ...rest }) => {
      if (rest.id === id)
        return {
          IsSeen: true,
          ...rest,
        };
      return { IsSeen, ...rest };
    });
    setList(newList);
  };
  const scrollToBottom = () => {
    progressRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const fetch = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get(`/api/notifications?page=${page}`);
      setPage((prev) => prev + 1);
      const { rows } = res.data.notifications;
      if (rows.length === 0) setShouldLoadMore(false);
      setList([...list, ...rows]);
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
    setIsLoading(false);
  };
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && shouldLoadMore && !isLoading) {
      fetch();
    }
  };
  const handleRefresh = async () => {
    setIsLoading(true);
    setPage(0);
    setShouldLoadMore(true);
    try {
      const res = await axiosClient.get(`/api/notifications?page=0`);
      setPage((prev) => prev + 1);
      const { rows } = res.data.notifications;
      if (rows.length === 0) setShouldLoadMore(false);
      setList([...rows]);
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetch();
  }, []);
  // useEffect(() => {
  //   if (isLoading === true) scrollToBottom();
  // }, [isLoading]);
  useEffect(() => {
    if (list.some((e) => e.IsSeen === false)) {
      setIsNew(true);
    } else setIsNew(false);
  }, [list]);
  // useEffect(() => {

  // }, [list]);
  return (
    <>
      <IconButton color="inherit" onClick={handleNoti}>
        <Badge variant="dot" color="error" invisible={!isNew}>
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
            height: 375,
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
          divider
          disabled
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
        <IconButton
          size="small"
          sx={{ position: "absolute", top: 4, right: 10 }}
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </IconButton>
      </Menu>
    </>
  );
};

export default Notifications;

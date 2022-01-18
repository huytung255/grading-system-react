import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import axiosClient from "../../api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "../../redux/alert";
import { useDispatch, useSelector } from "react-redux";
const CommentInput = ({ setComments, gradeReviewId }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    image: "",
  });
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await axiosClient.get("/api/users/dashboard");
        const { name, image } = res.data.user;
        setUserInfo({
          name: name,
          image: image,
        });
      } catch (error) {
        if (error.response) {
          dispatch(setErrorMsg(error.response.data));
        } else console.log(error);
      }
    }
    fetchUserInfo();
  }, []);
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSend = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/api/grade-review/comments", {
        gradeReviewId: gradeReviewId,
        content: comment,
      });
      // const { content, createdAt } = res.data;
      setComment("");
      setComments((prev) => {
        const newComments = [...prev];
        newComments.push({
          name: userInfo.name,
          image: userInfo.image,
          content: comment,
          createdAt: new Date().toString(),
        });
        return newComments;
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        dispatch(setErrorMsg(error.response.data));
      } else console.log(error);
    }
  };
  return (
    <Stack flexDirection="row" mb={2} alignItems="start">
      <Avatar
        alt={userInfo.name}
        src={userInfo.image}
        sx={{ width: 35, height: 35, mr: 2 }}
      >
        {userInfo.name.charAt(0)}
      </Avatar>
      <TextField
        size="small"
        fullWidth
        multiline
        value={comment}
        onChange={(e) => handleChange(e)}
      ></TextField>
      <LoadingButton
        loading={loading}
        variant="text"
        disabled={comment.length === 0}
        onClick={handleSend}
        sx={{ ml: 1 }}
      >
        <SendIcon />
      </LoadingButton>
    </Stack>
  );
};

export default CommentInput;

import React, { useState } from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import GradingIcon from "@mui/icons-material/Grading";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";
const Grade = ({
  classId,
  studentGradeId,
  finalizedGrade,
  title,
  isRequested,
  isAverage,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [isRequestedLocal, setIsRequestedLocal] = useState(isRequested);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <Paper
      sx={{
        width: "100%",
        pt: 1,
        pl: 2,
        pb: 1,
        pr: 2,
        mb: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 35,
          height: 35,
          backgroundColor: "primary.main",
          borderRadius: "50%",
        }}
      >
        {isAverage ? (
          <CheckIcon
            sx={{ fill: "#FFFFFF", fontSize: 20 }}
            fontSize="inherit"
          />
        ) : (
          <GradingIcon
            sx={{ fill: "#FFFFFF", fontSize: 20 }}
            fontSize="inherit"
          />
        )}
      </Box>
      <Typography
        sx={{ fontSize: 14, fontWeight: 500, color: "text.primary", ml: 2 }}
      >
        {title}: {finalizedGrade}
      </Typography>
      {isAverage ? (
        <></>
      ) : (
        <>
          {isRequestedLocal ? (
            <Button
              component={Link}
              to={`/class/${classId}/gradeDetails/${studentGradeId}`}
              state={{
                role: "student",
              }}
              variant="contained"
              size="small"
              color="success"
              sx={{ ml: "auto" }}
            >
              view review
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                size="small"
                sx={{ ml: "auto" }}
                onClick={handleOpen}
              >
                request review
              </Button>
              <ReviewModal
                open={openModal}
                onClose={handleClose}
                classId={classId}
                studentGradeId={studentGradeId}
                setIsRequested={setIsRequestedLocal}
              />
            </>
          )}
        </>
      )}
    </Paper>
  );
};

export default Grade;

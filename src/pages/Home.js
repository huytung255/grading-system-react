import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import AddNewModal from "../components/AddNewModal";
import ClassCard from "../components/ClassCard";
import { setErrorMsg } from "../redux/alert";
import { useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  async function fetchAPI() {
    try {
      const res = await axiosClient.get("/api/classes");
      setClasses([...res.data]);
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMsg(error.response.data));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <Box mt={3}>
      <Container maxWidth="xl">
        <Box textAlign="center" mb={3}>
          <Button
            variant="contained"
            disableElevation={true}
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add new
          </Button>
        </Box>
        <AddNewModal
          open={openModal}
          onClose={handleClose}
          fetchAPI={fetchAPI}
          isEditing={false}
        />
        <Grid container spacing={2}>
          {classes.map((classItem) => {
            const {
              id,
              className,
              classSection,
              subject,
              room,
              usersclasses: { role },
            } = classItem;
            return (
              <Grid item xs={12} md={3} key={id}>
                <ClassCard
                  name={className}
                  section={classSection}
                  id={id}
                  role={role}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

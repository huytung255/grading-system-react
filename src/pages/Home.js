import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import AddNewModal from "../components/AddNewModal";
import ClassCard from "../components/ClassCard";
const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  async function fetchAPI() {
    try {
      const res = await axiosClient.get("/classes");
      setClasses(res.data);
    } catch (e) {
      console.log(e);
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
        />
        <Grid container spacing={2}>
          {classes.map((classItem) => {
            const { CLASS_ID, NAME, SECTION, SUBJECT } = classItem;
            return (
              <Grid item xs={12} md={3} key={CLASS_ID}>
                <ClassCard name={NAME} section={SECTION} id={CLASS_ID} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

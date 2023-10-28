import React, { useState, useEffect } from "react";

import { Link, Routes, Route } from "react-router-dom";
import { Box, Typography, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import component
import TablaCustom from '../components/TablaCustom';
import ModalFormEmployes from "../components/ModalFormEmployes";

// import api employes
import { getEmployes } from "../api/api.employes";

function Labour() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [employes, setEmployes] = useState([]);

  const getDataEmployes = async () => {
    const data = await getEmployes();
    console.log("🚀 ~ file: Labour.jsx:22 ~ getDataEmployes ~ data:", data)
    setEmployes(data);
  }

  useEffect(() => {
    getDataEmployes();
  }, []);

  return (
    <>
      <h2 className="App">Mano de Obra</h2>
      <Box
        sx={{ height: 40, margin: 2 }}
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h5">Lista de Empleados</Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          color='secondary'
          startIcon={<AddIcon />}
        >
          Nuevo Empleado
        </Button>
        <ModalFormEmployes
          open={open}
          setOpen={setOpen}
          getDataEmployes={getDataEmployes}
        />
      </Box>
      <Divider/>
      <TablaCustom
        rows={employes}
      />
    </>
  );
}

export { Labour };

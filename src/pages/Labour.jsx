import React, { useState, useEffect } from "react";

import { Link, Routes, Route } from "react-router-dom";
import { Box, Typography, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import component
import TablaEmployes from '../components/TablaEmployes';
import ModalFormEmployes from "../components/ModalFormEmployes";
import LinearColor from "../components/LinearColor";

// import api employes
import { getEmployes } from "../api/api.employes";

function Labour() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataEmployes = async () => {
    setLoading(true);
    const data = await getEmployes();
    console.log("🚀 ~ file: Labour.jsx:22 ~ getDataEmployes ~ data:", data)
    setEmployes(data);
    setLoading(false);
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
      {loading ? <LinearColor/> : null}
      <Divider/>
      <TablaEmployes
        rows={employes}
        getDataEmployes={getDataEmployes}
      />
    </>
  );
}

export { Labour };

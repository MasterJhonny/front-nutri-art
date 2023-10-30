import React, { useState, useEffect } from "react";

import { Link, Routes, Route } from "react-router-dom";
import { Box, Typography, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import component
import TableIndirectCost from '../components/TableIndirectCost';
import ModalFormInCosts from "../components/ModalFormInCosts";
import LinearColor from "../components/LinearColor";

// import api employes
import { getInCosts } from "../api/api.incost";

function IndirectCosts() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [inCosts, setInCosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataInCosts = async () => {
    setLoading(true);
    const data = await getInCosts();
    console.log("🚀 ~ file: Labour.jsx:22 ~ getDataInCosts ~ data:", data)
    setInCosts(data);
    setLoading(false);
  }

  useEffect(() => {
    getDataInCosts();
  }, []);

  return (
    <>
      <h2 className="App">Costos Indirectos de Fabricación</h2>
      <Box
        sx={{ height: 40, margin: 2 }}
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h5">Lista de Costos Indirectos</Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          color='secondary'
          startIcon={<AddIcon />}
        >
          Nuevo Registro
        </Button>
        <ModalFormInCosts
          open={open}
          setOpen={setOpen}
          getDataInCosts={getDataInCosts}
        />
      </Box>
      {loading ? <LinearColor/> : null}
      <Divider/>
      <TableIndirectCost
        rows={inCosts}
        getDataInCosts={getDataInCosts}
      />
    </>
  );
}

export { IndirectCosts };


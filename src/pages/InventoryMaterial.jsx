import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import {
  Breadcrumbs,
  Box,
  Button,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableOperations from "../components/TableOperations";
import ModalForm from '../components/ModalForm';

// import api request
import { getMaterial } from "../api/api.material.js"

import { NotFound } from "./NotFound";

function InventoryMaterial() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  
  const [material, setMaterial] = useState(null);
  const [updateData, setUpdateData ] = useState(0);

  const getDataMaterial = async () => {
    const rta = await getMaterial();
    console.log("🚀 ~ file: InventoryMaterial.jsx:25 ~ getDataMaterial ~ rta:", rta);
    setMaterial(rta);
  }

  useEffect(() => {
    console.log("Aqui paso!")
    getDataMaterial()
  }, []);

  useEffect(() => {
    console.log("updated!")
    getDataMaterial()
  }, [updateData]);

  return (
    <div className="App">
      <Box
        sx={{ height: 40, margin: 2 }}
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h5">Lista de Materiales</Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          color='secondary'
          startIcon={<AddIcon />}
        >
          Nuevo Material
        </Button>
        <ModalForm
            open={open}
            setOpen={setOpen}
            setMaterial={setMaterial}
        />
      </Box>
      <p>TARJETA KARDEX FISICO Y VALORADO</p>
      <Breadcrumbs aria-label="breadcrumb">
        {
            material === null ? 
            <p>Cargando...</p> :
            material.map(item=> (
                <NavLink key={item._id} underline="hover" to={item.path}>{item.article}</NavLink>
            ))
        }
      </Breadcrumbs>
      <Routes>
        {
            material === null ? 
            null :
            material.map(item=> (
                <Route
                    key={item._id}
                  path={item.path}
                  element={<TableOperations dataItem={item} updateData={updateData} setUpdateData={setUpdateData} />}
                />
            ))
        }
      </Routes>
    </div>
  );
}

export { InventoryMaterial };

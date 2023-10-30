import React from "react";

import { Link, Routes, Route } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';

function ProductionCost() {
  return (
    <>
      <h1>Costos de Producción</h1>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to={""}>
          Hola de Costos
        </Link>
        <Link underline="hover" color="inherit" to={"faker"}>
          Inventario de Productos Terminados
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          to={"otro"}
          aria-current="page"
        >
          Operaciones
        </Link>
      </Breadcrumbs>
      <Routes>
        <Route path="" element={<h3>Aqui ira el detalle de Materia Prima!</h3>} />
        <Route path="faker" element={<h3>Aqui ira el detalle de Mano de Obra!</h3>} />
        <Route path="otro" element={<h3>Aqui ira el detalle de Mano de Costos Indirectos!</h3>} />
      </Routes>
    </>
  );
}

export { ProductionCost };

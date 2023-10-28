import React from "react";

import { Link, Routes, Route } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';

function IndirectCosts() {
  return (
    <>
      <h1>Costos Indirectos de fabricacion</h1>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to={""}>
          Materia Prima
        </Link>
        <Link underline="hover" color="inherit" to={"faker"}>
          Mano de Obra
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          to={"otro"}
          aria-current="page"
        >
          Costos Indirectos
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

export { IndirectCosts };

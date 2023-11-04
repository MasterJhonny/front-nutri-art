import React from "react";

import { Routes, Route, NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';

// import components
import MultipleSheet from "./subpages/MultipleSheet";

// data for multiple Sheets 
const listCosts = [
  {
    name: 'MATERIALES DIRECTOS',
    path: 'directMaterial',
  },
  {
    name: 'COSTO DE MANO DE OBRA',
    path: 'workforceCost',
  },
  {
    name: 'COSTOS INDIRECTOS DE FABRICACIÓN',
    path: 'manufacturingCosts',
  },
  {
    name: 'COSTO DE PRODUCCIÓN',
    path: 'prodCosts',
  },
];

function ProductionCost() {
  return (
    <>
      <h1>Costos de Producción</h1>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink underline="hover" color="inherit" to={"costSheet"}>
          Hola de Costos
        </NavLink>
        <NavLink underline="hover" color="inherit" to={"productInventory"}>
          Inventario de Productos Terminados
        </NavLink>
        <NavLink
          underline="hover"
          color="text.primary"
          to={"oper"}
          aria-current="page"
        >
          Operaciones
        </NavLink>
      </Breadcrumbs>
      <Routes>
        <Route path="costSheet/*" element={<MultipleSheet nameSubPage={"Hoja de Costos"} listTables={listCosts}/>} />
        <Route path="productInventory/*" element={<MultipleSheet nameSubPage={"Inventario de Productos Terminados"}/>} />
        <Route path="oper/*" element={<MultipleSheet nameSubPage={"Operaciones"}/>} />
      </Routes>
    </>
  );
}

export { ProductionCost };

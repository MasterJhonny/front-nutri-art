import React from "react";

import { Routes, Route, NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';

// import components
import MultipleSheet from "./subpages/MultipleSheet";
import { config } from "../config.js";

const API_BASE = config.API_URL;

// data for multiple Sheets 
const listCosts = [
  {
    name: 'MATERIALES DIRECTOS',
    path: 'directMaterial',
    url: `${API_BASE}/lotes/set-lotes-number/1`,
    list: [
      {
        head: 'FECHA',
        property: 'created_at',
        align: 'left',
      },
      {
        head: 'DETALLE',
        property: 'detail',
        align: 'left',
      },
      {
        head: 'CANTIDAD',
        property: 'count',
        align: 'right',
      },
      {
        head: 'MEDIDA',
        property: 'measure',
        align: 'right',
      },
      {
        head: 'COSTO',
        property: 'costs',
        align: 'right',
      },
      {
        head: 'IMPORTE',
        property: 'import',
        align: 'right',
      }
    ] 
  },
  {
    name: 'COSTO DE MANO DE OBRA',
    path: 'workforceCost',
    url: `${API_BASE}/employes`,
    list: [
      {
        head: 'FECHA',
        property: 'created_at',
        align: 'left',
      },
      {
        head: 'DETALLE',
        property: 'fullName',
        align: 'left',
      },
      {
        head: 'HORAS',
        property: 'hours',
        align: 'right',
      },
      {
        head: 'COSTO',
        property: 'costs',
        align: 'right',
      },
      {
        head: 'IMPORTE',
        property: 'import',
        align: 'right',
      }
    ] 
  },
  {
    name: 'COSTOS INDIRECTOS DE FABRICACIÓN',
    path: 'manufacturingCosts',
    url: `${API_BASE}/incost`,
    list: [
      {
        head: 'FECHA',
        property: 'created_at',
        align: 'left',
      },
      {
        head: 'DETALLE',
        property: 'detail',
        align: 'left',
      },
      {
        head: 'COSTO POR LITRO',
        property: 'amountForLiter',
        align: 'right',
      },
      {
        head: 'IMPORTE',
        property: 'import',
        align: 'right',
      }
    ] 
  },
  {
    name: 'COSTO DE PRODUCCIÓN',
    path: 'prodCosts',
    // url: `${API_BASE}/lotes/set-lotes-number/1`,
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

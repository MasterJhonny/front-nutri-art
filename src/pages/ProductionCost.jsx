import React from "react";

import { Routes, Route, NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';

// import components
import MultipleSheet from "./subpages/MultipleSheet";
import TableFinishedProducts from "../components/TableFinishedProducts";
import { config } from "../config.js";

const API_BASE = config.API_URL;

// data for multiple Sheets 
const listCosts = [
  {
    name: 'MATERIALES DIRECTOS',
    path: 'directMaterial',
    url: `${API_BASE}/lotes/set-lotes-number`,
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
  },
];

const dataProduct = {
  _id: "finishedProduct",
  article: "YOGURT DE CHILTO",
  code: "00-001",
  unitMeasure: "unidades",
  countMin: 90,
  location: "almacen",
  stock: 0,
}

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
      </Breadcrumbs>
      <Routes>
        <Route path="costSheet/*" element={<MultipleSheet nameSubPage={"Hoja de Costos"} listTables={listCosts}/>} />
        <Route path="productInventory/*" element={<TableFinishedProducts dataItem={dataProduct}/>} />
      </Routes>
    </>
  );
}

export { ProductionCost };

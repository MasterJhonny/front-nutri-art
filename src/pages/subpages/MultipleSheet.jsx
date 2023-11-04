import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const MultipleSheet = ({ nameSubPage, listTables = [] }) => {
  return (
    <>
      <h3>{nameSubPage}</h3>
      <Breadcrumbs aria-label="breadcrumb">
        {listTables.map((table) => (
          <NavLink key={table.name} underline="active" to={table.path}>
            {table.name}
          </NavLink>
        ))}
      </Breadcrumbs>
      <Routes>
        {listTables.map((table) => (
          <Route
            key={table.name}
            path={table.path}
            element={<h3>{table.name}</h3>}
          />
        ))}
      </Routes>
    </>
  );
};

export default MultipleSheet;

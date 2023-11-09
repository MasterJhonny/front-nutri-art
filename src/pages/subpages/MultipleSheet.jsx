import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TablaCustom from "../../components/TablaCustom";

// import api
import { getSummariesLots } from "../../api/api.lotes.js";

const MultipleLots = ({ listLots = [], url, list, title }) => {
  return (
    <>
      <h3>Costo por Lotes</h3>
      <Breadcrumbs aria-label="breadcrumb">
        {listLots.map((lot) => (
          <NavLink
            key={lot.numberLot}
            underline="active"
            to={lot.numberLot.toString()}
          >
            Lote {lot.numberLot}
          </NavLink>
        ))}
      </Breadcrumbs>
      <Routes>
        {listLots.map((lot) => (
          <Route
            key={lot.numberLot}
            path={lot.numberLot.toString()}
            element={
              <TablaCustom
                url={`${url}/${lot.numberLot}`}
                list={list}
                isTableMaterial={true}
                title={title}
                dataLot={lot}
                isCompletedLot={lot.isCompletedSetLot}
              />
            }
          />
        ))}
      </Routes>
    </>
  );
};

const MultipleSheet = ({ nameSubPage, listTables = [] }) => {
  const [summariesLotes, setSummariesLotes] = useState([]);

  const getDataSummary = async () => {
    const data = await getSummariesLots();
    setSummariesLotes(data);
  };

  useEffect(() => {
    getDataSummary();
  }, []);
  return (
    <>
      <h3 className="App">{nameSubPage.toUpperCase()}</h3>
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
            path={
              table.name === "MATERIALES DIRECTOS"
                ? `${table.path}/*`
                : table.path
            }
            element={
              table.name === "MATERIALES DIRECTOS" ? (
                <MultipleLots
                  listLots={summariesLotes}
                  path={table.path}
                  url={table.url}
                  list={table.list}
                  title={table.name}
                />
              ) : (
                <TablaCustom
                  url={table.url}
                  list={table.list}
                  title={table.name}
                />
              )
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default MultipleSheet;

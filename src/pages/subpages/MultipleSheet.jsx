import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TablaCustom from "../../components/TablaCustom";
import BasicTable from "../../components/BasicTable";

// import api
import { getSummariesLots } from "../../api/api.lotes.js";
import { getSummariesCost } from "../../api/api.summaries.js";

const MultipleLots = ({ listLots = [], url, list, title }) => {

  const identifyNumberLot = (lot) => {
    return lot.numberLot
      ? lot.numberLot.toString()
      : lot.numberLotSet.toString();
  };

  return (
    <>
      <h3>Costo por Lotes</h3>
      <Breadcrumbs aria-label="breadcrumb">
        {listLots.map((lot) => (
          <NavLink
            key={identifyNumberLot(lot)}
            underline="active"
            to={identifyNumberLot(lot)}
          >
            Lote {identifyNumberLot(lot)}
          </NavLink>
        ))}
      </Breadcrumbs>
      <Routes>
        {listLots.map((lot) => (
          <Route
            key={identifyNumberLot(lot)}
            path={identifyNumberLot(lot)}
            element={
              title === "MATERIALES DIRECTOS" ? (
                <TablaCustom
                  url={`${url}/${lot.numberLot}`}
                  list={list}
                  isTableMaterial={true}
                  title={title}
                  dataLot={lot}
                  isCompletedLot={lot.isCompletedSetLot}
                />
              ) : (
                <BasicTable summaryCost={lot}/>
              )
            }
          />
        ))}
      </Routes>
    </>
  );
};

const MultipleSheet = ({ nameSubPage, listTables = [] }) => {
  const [summariesLotes, setSummariesLotes] = useState([]);
  const [summaryCost, setSummaryCost] = useState([]);

  const getData = async () => {
    const response = await Promise.all([
      getSummariesLots(),
      getSummariesCost(),
    ]);
    setSummariesLotes(response[0]);
    setSummaryCost(response[1]);
  };

  useEffect(() => {
    getData();
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
              table.name === "MATERIALES DIRECTOS" || table.path === "prodCosts"
                ? `${table.path}/*`
                : table.path
            }
            element={
              table.name === "MATERIALES DIRECTOS" ||
              table.path === "prodCosts" ? (
                <MultipleLots
                  listLots={
                    table.path === "prodCosts" ? summaryCost : summariesLotes
                  }
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

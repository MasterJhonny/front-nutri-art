import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
// import component
import TableSales from "../components/TableSales";
import LinearColor from "../components/LinearColor";

// import api employes
import { getSales } from "../api/api.sales";

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataSales = async () => {
    setLoading(true);
    const data = await getSales();
    setSales(data);
    setLoading(false);
  };

  useEffect(() => {
    getDataSales();
  }, []);

  return (
    <>
      <h2 className="App">Registro de Ventas</h2>
      {loading ? <LinearColor /> : null}
      <Divider />
      {sales.length > 0 ? (
        <TableSales rows={sales} getDataSales={getDataSales} setLoading={setLoading} />
      ) : null}
    </>
  );
}

export { Sales };

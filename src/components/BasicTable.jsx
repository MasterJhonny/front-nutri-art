import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

const listPropertys = {
  directMaterialCost: "MATERIALES DIRECTOS",
  workforceCost: "MANO DE OBRA",
  indirectCost: "COSTOS INDIRECTOS",
  productionCost: "COSTO DE PRODUCCIÓN",
  lotSize: "CANTIDADES TERMINADAS",
  unitCost: "COSTO UNITARIO ",
};

const styedHead = {
  fontWeight: "bold",
  color: "#272829",
};

const styedProperty = {
  fontWeight: "bold",
  color: "#363062",
};
const styedCost = {
  fontWeight: "bold",
  color: "#435585",
};

const styedCostBack = {
  backgroundColor: "#F1EAFF",
};

export default function BasicTable({ summaryCost }) {
  const propertys = Object.entries(summaryCost).filter(
    (item) => typeof item[1] === "number"
  );
  const list = propertys.slice(0, propertys.length - 2);
  return (
    <>
      <Divider sx={{ marginBlock: 2 }} />
      <TableContainer sx={{ maxWidth: 400 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={styedCostBack}>
              <TableCell sx={styedHead}>DETALLE</TableCell>
              <TableCell sx={styedHead} align="right">
                COSTO
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((property) => (
              <TableRow
                key={property[0]}
                sx={property[0] === "unitCost" ? styedCostBack : null }
              >
                <TableCell component="th" scope="row" sx={styedProperty}>
                  {listPropertys[property[0]]}
                </TableCell>
                <TableCell sx={styedCost} align="right">
                  {property[1].toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

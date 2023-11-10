import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import Divider from "@mui/material/Divider";

import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import LinearColor from "../components/LinearColor";
import HeaderSheet from "../components/HeaderSheet";
// import api employes
import { getData } from "../api/api.lotes.js";
import { buildDataTable, buildTotalImport } from "../func";

// styed headRows
const styedHead = {
  fontWeight: "bold",
  color: "#272829",
};

export default function TablaCustom({ url, list = [], isTableMaterial = false, title, dataLot }) {
  const [rows, setRows] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getDataForTable = async () => {
    if (url) {
      setLoading(true);
      const data = await getData(url);
      const newRows = buildDataTable(data);
      const importTotal = buildTotalImport(newRows);
      setRows(newRows);
      setTotal(importTotal);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getDataForTable();
    return () => {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getDataForTable();
  }, [url]);

  return (
    <>
      <HeaderSheet title={title} isTableMaterial={isTableMaterial} dataLot={dataLot} setLoading={setLoading}/>
      <Divider sx={{ marginTop: 1 }} />
      {loading ? <LinearColor /> : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {list.map((item) => (
                <TableCell key={item.head} sx={styedHead} align={item.align}>
                  {item.head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row._id}>
                {list.map((record) => (
                  <TableCell key={record.property} style={{ width: 180 }} align={record.align}>
                    {row[record.property]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow key='total-mes'>
              <TableCell colSpan={list.length - 1} sx={styedHead} align='right'>
                {isTableMaterial ? "TOTAL POR LOTE" : "TOTAL MESUAL"}
              </TableCell>
              <TableCell sx={styedHead} align='right'>
                {total.toFixed(2)}
              </TableCell>
            </TableRow>
            {
              isTableMaterial ? null :
              <TableRow key='total-lote'>
                <TableCell colSpan={list.length - 1} sx={styedHead} align='right'>
                  {"TOTAL POR LOTE"}
                </TableCell>
                <TableCell sx={styedHead} align='right'>
                  {(total/3).toFixed(2)}
                </TableCell>
              </TableRow>
            }
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

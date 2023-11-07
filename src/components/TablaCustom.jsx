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
import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import LinearColor from "../components/LinearColor";
// import api employes
import { getData } from "../api/api.general.js";
import { buildDataTable, buildTotalImport } from "../func";

// styed headRows
const styedHead = {
  fontWeight: "bold",
  color: "#272829",
};

export default function TablaCustom({ url, list = [] }) {

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
      console.log(
        "🚀 ~ file: TablaCustom.jsx:38 ~ aqui-------------------> ~ newRows:",
        newRows
      );
      const importTotal = buildTotalImport(newRows);
      setRows(newRows);
      setTotal(importTotal);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getDataForTable();
  }, []);

  React.useEffect(() => {
    getDataForTable();
  }, [url]);

  return (
    <>
      {loading ? <LinearColor /> : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {list.map((item) => (
                <TableCell sx={styedHead} align={item.align}>
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
                  <TableCell style={{ width: 180 }} align={record.align}>
                    {row[record.property]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow key='total'>
              <TableCell colSpan={list.length - 1} sx={styedHead} align='right'>
                {"TOTAL"}
              </TableCell>
              <TableCell sx={styedHead} align='right'>
                {total}
              </TableCell>
            </TableRow>
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

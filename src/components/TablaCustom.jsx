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

import DeleteIcon from '@mui/icons-material/Delete';
// import api employes
import { deletedEmploye } from "../api/api.employes";

export default function TablaCustom({ rows, getDataEmployes }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
  // handle click buton delete employes
  const handleClickDelete = async (id) => {
    console.log('Eliminar!', id);
    const rta = await deletedEmploye(id);
    console.log("🚀 ~ file: TablaCustom.jsx:37 ~ handleClickDelete ~ rta:", rta);
    if (rta.delete) {
      getDataEmployes();
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }} >Nombre completo</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Cargo</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Sueldo</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Fecha de Regsitro</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Borrar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.fullName}
              </TableCell>
              <TableCell align="right">
                {row.role}
              </TableCell>
              <TableCell style={{ width: 180 }} align="right">
                {row.salary}
              </TableCell>
              <TableCell style={{ width: 180 }} align="right">
                {row.date}
              </TableCell>
              <TableCell style={{ width: 140 }} align="center">
                <IconButton onClick={() => handleClickDelete(row._id)}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
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
                  "aria-label": "rows per page"
                },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

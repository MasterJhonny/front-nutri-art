import React, { useState, useEffect } from "react";
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
import PrintIcon from "@mui/icons-material/Print";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

// import modal
import ModalFactura from "../components/ModalFactura";
import ModalFormFactura from "../components/ModalFormFactura";

export default function TableSales({ rows = [], getDataSales, setLoading }) {
  console.log("🚀 ~ file: TableSales.jsx:18 ~ TableSales ~ rows:", rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const [openModalView, setOpenModalView] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [recordSale, setRecordSale] = useState({ statusRecord: false });

  // handle click btns
  const searchRegisterSale = (id) => {
    return rows.find((sale) => sale._id === id);
  }
  const handleClickPrint = async (id, index) => {
    const salePrint = searchRegisterSale(id);
    setRecordSale({
      ...salePrint,
      invoiceNumber: index + 1,
      statusRecord: true,
    });
    setOpenModalView(true);
  };

  const handleClickRegister = (id, index) => {
    const salePrint = searchRegisterSale(id);
    setRecordSale({
        ...salePrint,
        invoiceNumber: index + 1,
        statusRecord: true,
    });
    setOpenModalForm(true);
  };

  return (
    <>
      {recordSale.statusRecord ? (
        <>
          <ModalFactura
            open={openModalView}
            setOpen={setOpenModalView}
            dataSale={recordSale}
          />
          <ModalFormFactura
            open={openModalForm}
            setOpen={setOpenModalForm}
            getDataSales={getDataSales}
            setLoading={setLoading}
            dataSale={recordSale}
          />
        </>
      ) : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Fecha de Registro
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Cantidad
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Costos
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Costo de Producción
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Precios de Venta
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Importe de Venta
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Precios de Factura
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Importe de Factura
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Imprimir o Registrar Factura
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => (
              <TableRow key={row._id}>
                <TableCell style={{ width: 160 }}>{row.date}</TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.amount}
                </TableCell>
                <TableCell align="center">
                  {row.currentUnitCost
                    .map((item) => item.cost.toFixed(2))
                    .join(", ")}
                </TableCell>
                <TableCell style={{ width: 180 }} align="center">
                  {row.productionCost.toFixed(2)}
                </TableCell>
                <TableCell style={{ width: 180 }} align="center">
                  {row.salePrice.map((item) => item.toFixed(2)).join(", ")}
                </TableCell>
                <TableCell style={{ width: 180 }} align="center">
                  {row.salesAmount.toFixed(2)}
                </TableCell>
                <TableCell style={{ width: 180 }} align="center">
                  {row.invoicePrice.map((item) => item.toFixed(2)).join(", ")}
                </TableCell>
                <TableCell style={{ width: 180 }} align="center">
                  {row.invoiceAmount.toFixed(2)}
                </TableCell>
                <TableCell style={{ width: 180 }} align="center">
                  <IconButton
                    onClick={
                      row.invoiceStatus
                        ? () => handleClickPrint(row._id, i)
                        : () => handleClickRegister(row._id, i)
                    }
                  >
                    {row.invoiceStatus ? (
                      <PrintIcon />
                    ) : (
                      <AppRegistrationIcon />
                    )}
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
                colSpan={9}
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

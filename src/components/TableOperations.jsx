import * as React from "react";

import {
  Box,
  Typography,
  Grid,
  Paper,
  styled,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid"; unistall
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

// import components
import AlertDialogSlide from "../components/AlertDialogSlide";
import ModalFormOperations from "../components/ModalFormOperations";
import LinearColor from '../components/LinearColor';

// import api get operaciones
import { getOperationsByMaterialId } from "../api/api.operations.js"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "1px solid #D3D6DB",
}));

// styled
const styledFontBold = {
  fontWeight: "bold",
  color: '#4f4f4f'
}

export default function TableOperations({
  dataItem,
  updateData,
  setUpdateData,
}) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // logica tabla
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

  const [loading, setLoading] = React.useState(false);

  // get data handle
  const [rows, setRows] = React.useState([]);
  const getDataOperations = async () => {
    setLoading(true);
    const operations = await getOperationsByMaterialId(dataItem._id);
    console.log("🚀 ~ file: TableOperations.jsx:92 ~ getDataOperations ~ operations:", operations);
    setRows(operations);
    setLoading(false);
  }

  React.useEffect(() => {
    getDataOperations();
  }, [dataItem]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Divider sx={{ marginTop: 1 }} />
      <Box sx={{ margin: 2 }}>
        <Box
          sx={{ marginBottom: 2 }}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h6">{dataItem.article}</Typography>
          <Box>
            <Button
              sx={{ marginRight: 1 }}
              variant="outlined"
              startIcon={<NoteAddIcon />}
              color="secondary"
              onClick={handleClickOpen}
            >
              Agregar Operaciones
            </Button>
            <ModalFormOperations
              open={open}
              setOpen={setOpen}
              id={dataItem._id}
              getDataOperations={getDataOperations}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={handleClickOpenAlert}
            >
              Eliminar Material
            </Button>
            <AlertDialogSlide
              open={openAlert}
              setOpen={setOpenAlert}
              id={dataItem._id}
              nameMaterial={dataItem.article}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item>
              <span style={{ fontWeight: "bold" }}>Código: </span>
              {dataItem.code}
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <span style={{ fontWeight: "bold" }}>Unidad de medida: </span>
              {dataItem.unitMeasure}
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <span style={{ fontWeight: "bold" }}>Cantidad Minima: </span>
              {dataItem.countMin}
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <span style={{ fontWeight: "bold" }}>Cantidad Maxima: </span>
              {dataItem.countMax}
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <span style={{ fontWeight: "bold" }}>Localización: </span>
              {dataItem.location}
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <span style={{ fontWeight: "bold" }}>Existencias: </span>
              {dataItem.stock.toFixed(0)}
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <span style={{ fontWeight: "bold" }}>Proveedor: </span>
              {dataItem.provider}
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <span style={{ fontWeight: "bold" }}>Telefono: </span>
              {dataItem.phone}
            </Item>
          </Grid>
        </Grid>
      </Box>
      {loading ? <LinearColor/> : null}
      <TableContainer component={Paper} sx={{ border: "1px solid #DFD8C8" }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} >{dataItem.article}</TableCell>
              <TableCell colSpan={3} sx={styledFontBold} align="center">ENTRADAS</TableCell>
              <TableCell colSpan={3} sx={styledFontBold} align="center">SALIDAS</TableCell>
              <TableCell colSpan={3} sx={styledFontBold} align="center">SALDOS</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styledFontBold}>FECHA</TableCell>
              <TableCell sx={styledFontBold} align="right">DETALLE</TableCell>
              <TableCell sx={styledFontBold} align="right">CANTIDAD</TableCell>
              <TableCell sx={styledFontBold} align="right">CU</TableCell>
              <TableCell sx={styledFontBold} align="right">TOTAL</TableCell>
              <TableCell sx={styledFontBold} align="right">CANTIDAD</TableCell>
              <TableCell sx={styledFontBold} align="right">CU</TableCell>
              <TableCell sx={styledFontBold} align="right">TOTAL</TableCell>
              <TableCell sx={styledFontBold} align="right">CANTIDAD</TableCell>
              <TableCell sx={styledFontBold} align="right">CU</TableCell>
              <TableCell sx={styledFontBold} align="right">TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">
                  {row.detail}
                </TableCell>
                <TableCell align="right">
                  {row.type === 1 ? row.record.amount : 0}
                </TableCell>
                <TableCell align="right">
                  {row.type === 1 ? row.record.currentUnitCost[0] : 0}
                </TableCell>
                <TableCell align="right">
                  {row.type === 1 ? row.record.total.toFixed(0) : 0}
                </TableCell>
                <TableCell align="right">
                  {row.type === 2 ? row.record.amount : 0}
                </TableCell>
                <TableCell align="right">
                  {row.type === 2 ? row.record.currentUnitCost.join(", ") : 0}
                </TableCell>
                <TableCell align="right">
                  {row.type === 2 ? row.record.total.toFixed(0) : 0}
                </TableCell>
                <TableCell align="right">
                  {row.balances.amount}
                </TableCell>
                <TableCell align="right">
                  {row.type === 1 ? row.balances.currentUnitCost[0].toFixed(2): "---" }
                </TableCell>
                <TableCell align="right">
                  {row.balances.total.toFixed(0)}
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
    </div>
  );
}

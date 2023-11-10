import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Typography, Modal, TextField, Grid } from "@mui/material";

// import api request
import { updatedSale } from "../api/api.sales.js";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleInput = {
  margin: 1,
};

function ModalFormFactura({ open, setOpen, getDataSales, setLoading, dataSale }) {
  const handleClose = () => setOpen(false);
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const updateDataSale = {
        ...data,
        invoiceDate: new Date(),
        invoiceStatus: true,
    }
    reset();
    handleClose();
    setLoading(true);
    const rta = await updatedSale(dataSale._id, updateDataSale);
    if (rta.update) {
      getDataSales();
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Registrar datos para la factura
        </Typography>
        <br />
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Controller
              name="businessName"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={styleInput}
                  id="standard-basic"
                  label="Razon Social"
                  type="text"
                  required
                  {...field}
                />
              )}
            />
            <Controller
              name="nit"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={styleInput}
                  id="standard-basic"
                  type="number"
                  label="NIT"
                  required
                  {...field}
                />
              )}
            />
            <Button sx={styleInput} type="sumbit" variant="contained">
              Registrar
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalFormFactura;

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField
} from "@mui/material";

// import api request
import { registerSaleAndOperationOut } from "../api/api.sales.js";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleInput = {
  margin: 1,
};

function ModalFormSales({ open, setOpen, id, setLoading, stock, getDataOperations }) {
  const handleClose = () => setOpen(false);
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    let record = {};
    let newOperation = {};
    const recordAmount = parseInt(data.amount);
    if (recordAmount > stock) {
      alert(`La cantidad de SALIDA debe ser menor o igual a las Existencias: ${stock}`);
      return 0;
    }
    record = {
      amount: recordAmount
    }
    delete data.amount
    delete data.currentUnitCost
    newOperation = {
      ...data,
      type: 2,
      record: record, 
      materialId: id
    }
    console.log("🚀 ~ file: ModalFormSales.jsx:57 ~ onSubmit ~ newOperation:", newOperation);
    reset();
    handleClose();
    setLoading(true);
    const rta = await registerSaleAndOperationOut(newOperation);
    if (rta.create) {
        getDataOperations();
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
          Registra una nueva Venta
        </Typography>
        <br />
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Box>
          <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ margin: 1, width: "222px" }}
                    id="standard-basic"
                    label="Fecha"
                    type="date"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="detail"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Detalle"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Cantidad"
                    type="number"
                    required
                    {...field}
                  />
                )}
              />
              <Button sx={styleInput} type="sumbit" variant="contained">
                Registrar
              </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalFormSales;
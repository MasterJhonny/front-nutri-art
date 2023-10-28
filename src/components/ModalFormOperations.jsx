import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Grid
} from "@mui/material";

// import compomnet
import ComboSelector from "../components/ComboSelector";

// import api request
import { createdOperation } from "../api/api.operations.js";

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

function ModalFormOperations({ open, setOpen, getDataOperations, id, updateData, setUpdateData }) {

  const handleClose = () => setOpen(false);
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const recordAmount = parseInt(data.amount);
    const recordCurrentUnitCost = parseInt(data.currentUnitCost);

    const record = {
        amount: recordAmount,
        currentUnitCost: recordCurrentUnitCost,
        total: recordAmount * recordCurrentUnitCost
    }
    delete data.amount
    delete data.currentUnitCost
    const newOperation = {
        ...data,
        record: record,
        materialId: id
    }
    console.log(newOperation);
    reset();
    handleClose();
    const rta = await createdOperation(newOperation);
    console.log("🚀 ~ file: ModalFormOperations.jsx:32 ~ onSubmit ~ rta:", rta);
    if (rta.create) {
      // getDataOperations();
      setUpdateData(updateData + 1)
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
          Registra una nueva Operación
        </Typography>
        <br />
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
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
                name="type"
                control={control}
                render={({ field }) => (
                  <ComboSelector
                  field={field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
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
              <Controller
                name="currentUnitCost"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="vr/u"
                    type="number"
                    required
                    {...field}
                  />
                )}
              />

              <Button sx={styleInput} type="sumbit" variant="contained">
                Registrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalFormOperations;

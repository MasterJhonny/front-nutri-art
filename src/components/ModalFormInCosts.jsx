import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Typography, Modal, TextField, Grid } from "@mui/material";

// import api request
import { createdInCost } from "../api/api.incost.js"

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

function ModalFormInCosts({ open, setOpen, getDataInCosts }) {
  const handleClose = () => setOpen(false);
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    reset();
    handleClose();
    const rta = await createdInCost(data);
    console.log("🚀 ~ file: ModalFormInCosts.jsx:32 ~ onSubmit ~ rta:", rta)
    if (rta.create) {
        getDataInCosts();
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
          Registra un nuevo Costo
        </Typography>
        <br />
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
            <Controller
                name="detail"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Detalle"
                    type="text"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="amountForLiter"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    type="number"
                    label="Importe por Litro"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="amountMoth"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    type="number"
                    label="Importe por Mes"
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

export default ModalFormInCosts;
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Typography, Modal, TextField, Grid } from "@mui/material";

// import api request
import { createdMaterial, getMaterial } from "../api/api.material.js"

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

function ModalForm({ open, setOpen, setMaterial }) {
  const handleClose = () => setOpen(false);
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    reset();
    handleClose();
    const rta = await createdMaterial(data);
    console.log("🚀 ~ file: ModalForm.jsx:32 ~ onSubmit ~ rta:", rta)
    if (rta.create) {
        const dataMaterial = await getMaterial();
        setMaterial(dataMaterial);
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
          Registra un nuevo Material
        </Typography>
        <br />
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controller
                name="article"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Artículo"
                    type="text"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Código"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="unitMeasure"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Unidad de medida"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="countMin"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    type="number"
                    label="Cantidad Minima"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="countMax"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    type="number"
                    label="Cantidad Maxima"
                    required
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="method"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Metodo"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    type="text"
                    label="Localización"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="provider"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Proveedor"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Telefono"
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

export default ModalForm;

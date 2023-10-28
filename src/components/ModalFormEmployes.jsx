import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Typography, Modal, TextField, Grid } from "@mui/material";

// import api request
import { createdEmploye } from "../api/api.employes.js"

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

function ModalFormEmployes({ open, setOpen, getDataEmployes }) {
  const handleClose = () => setOpen(false);
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    reset();
    handleClose();
    const rta = await createdEmploye(data);
    console.log("🚀 ~ file: ModalFormEmployes.jsx:32 ~ onSubmit ~ rta:", rta)
    if (rta.create) {
        getDataEmployes();
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
          Registra un nuevo Empleado
        </Typography>
        <br />
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
            <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Nombre Completo"
                    type="text"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    label="Cargo"
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={styleInput}
                    id="standard-basic"
                    type="number"
                    label="Sueldo"
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

export default ModalFormEmployes;

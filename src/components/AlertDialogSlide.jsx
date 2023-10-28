import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// import api delete
import { deletedMaterial } from "../api/api.material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, id, nameMaterial, updateData, setUpdateData }) {
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteMaterial = async () => {
    console.log("🚀 ~ file: AlertDialogSlide.jsx:15 ~ AlertDialogSlide ~ id:", id);
    const rta = await deletedMaterial(id);
    console.log("🚀 ~ file: AlertDialogSlide.jsx:25 ~ handleDeleteMaterial ~ rta:", rta);
    setOpen(false);
    if (rta.delete) {
      setUpdateData(updateData + 1);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Eliminar Material</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#343434" }}id="alert-dialog-slide-description">
            Esta seguro que quieres eliminar el Material "{nameMaterial}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDeleteMaterial}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
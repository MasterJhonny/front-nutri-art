import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Typography, Modal, Grid, Divider } from "@mui/material";

// import api request
import { transformDate } from "../func";

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

function ModalFactura({ open, setOpen, dataSale }) {
  const [renderButton, setRenderButton] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setRenderButton(true);
  };
  const handleClick = () => {
    setRenderButton(false);
    async function delay() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("PRINT--->");
      window.print();
    }
    delay();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" textAlign="center">
          EMPRESA "YOGURT NUTRI ART"
        </Typography>
        <p className="App">El Alto</p>
        <Typography id="modal-modal-title" variant="h5" textAlign="center">
          FACTURA
        </Typography>
        <p className="App">{"(Con Derecho a Credito Fiscal)"}</p>
        <Divider sx={{ border: 1, marginBottom: 2 }} />
        <Grid container spacing={1}>
          <Grid item xs={5}>
            NIT:
          </Grid>
          <Grid item xs={5} textAlign="right">
            126313029
          </Grid>
          <Grid item xs={5}>
            FACTURA NRO:
          </Grid>
          <Grid item xs={5} textAlign="right">
            {dataSale.invoiceNumber}
          </Grid>
        </Grid>
        <Divider sx={{ border: 1, marginBlock: 2 }} />
        <Grid container spacing={1}>
          <Grid item xs={5}>
            FECHA:
          </Grid>
          <Grid item xs={5} textAlign="right">
            {transformDate(dataSale.invoiceDate)}
          </Grid>
          <Grid item xs={5}>
            NOMBRE O RAZON SOCIAL:
          </Grid>
          <Grid item xs={5} textAlign="right">
            {dataSale.businessName}
          </Grid>
          <Grid item xs={5}>
            NIT/CI:
          </Grid>
          <Grid item xs={5} textAlign="right">
            {dataSale.nit}
          </Grid>
        </Grid>
        <Divider sx={{ border: 1, marginBlock: 2 }} />
        <Grid container spacing={1}>
          <Grid item xs={5}>
            DETALLE:
          </Grid>
          <Grid item xs={5}>
            YOGURT DE CHITO
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            CANTIDAD
          </Grid>
          <Grid item xs={4}>
            PRECIO UNITARIO
          </Grid>
          <Grid item xs={4}>
            SUBTOTAL
          </Grid>
          {dataSale.currentUnitCost
            ? dataSale.currentUnitCost.map((item, i) => (
                <>
                  <Grid item xs={4} key={item.amount}>
                    {item.amount}
                  </Grid>
                  <Grid item xs={4} key={dataSale.invoicePrice[i].toFixed(2)}>
                    {dataSale.invoicePrice[i].toFixed(2)}
                  </Grid>
                  <Grid item xs={4}  key={item._id}>
                    {(item.amount * dataSale.invoicePrice[i]).toFixed(2)}
                  </Grid>
                </>
              ))
            : null}
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            TOTAL
          </Grid>
          <Grid item xs={5} textAlign="right">
            {dataSale.invoiceAmount.toFixed(2)}
          </Grid>
        </Grid>
        <Divider sx={{ border: 1, marginBlock: 2 }} />
        <p className="App">
          Esta factura contrubuye al desarrollo del pais, El uso ilicito es
          sancionado por ley.
        </p>
        {renderButton ? (
          <Button color="secondary" variant="contained" onClick={handleClick}>
            Imprimir
          </Button>
        ) : null}
      </Box>
    </Modal>
  );
}

export default ModalFactura;

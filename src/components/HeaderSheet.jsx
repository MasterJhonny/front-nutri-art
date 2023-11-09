import React from "react";

import { Box, Button, Chip } from "@mui/material";

import { registerSummaryOperation } from "../api/api.summaries.js";

const styledChip = {
  fontSize: 14,
  fontWeight: "bold",
};

const HeaderSheet = ({ title, isTableMaterial, dataLot }) => {
  const handleClick = async () => {
    console.log("registar! la entrada en el kardex de PT", dataLot);
    const confirmValue = confirm(`Se llevara el Lote: ${dataLot.numberLot} al almacén!`);
    if (confirmValue) {
      const rta = await registerSummaryOperation(dataLot);
      console.log("🚀 ~ file: HeaderSheet.jsx:16 ~ handleClick ~ rta:", rta);
    }
  };

  return (
    <Box
      sx={{ height: 48, padding: 2 }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <h3>{title}</h3>
      {isTableMaterial ? (
        dataLot.isCompletedSetLot ? (
          <div>
            <Chip
              sx={styledChip}
              label="Lote Listo!"
              color="success"
              variant="outlined"
            />
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginLeft: 2 }}
              onClick={handleClick}
            >
              pasar a Almacen
            </Button>
          </div>
        ) : (
          <Chip
            sx={styledChip}
            label="Lote por completar!"
            color="info"
            variant="outlined"
          />
        )
      ) : null}
    </Box>
  );
};

export default HeaderSheet;

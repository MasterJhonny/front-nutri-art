import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Chip } from "@mui/material";
import { registerSummaryOperation } from "../api/api.summaries.js";

const styledChip = {
  fontSize: 14,
  fontWeight: "bold",
};

const HeaderSheet = ({ title, isTableMaterial, dataLot, setLoading }) => {

  const [loadingButton, setLoadingButton] = useState(false);

  const navigate = useNavigate();

  const handleClick = async () => {
    const confirmValue = confirm(`Se llevara el Lote: ${dataLot.numberLot} al almacén!`);
    if (confirmValue) {
      setLoadingButton(true);
      setLoading(true);
      const rta = await registerSummaryOperation(dataLot);
      console.log("🚀 ~ file: HeaderSheet.jsx:16 ~ handleClick ~ rta:", rta);
      if (rta.create) {
        navigate('/productionCost');
      }
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
              disabled={loadingButton}
              onClick={handleClick}
            >
              {loadingButton ? 'Cargando...' : 'pasar a Almacen'}
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

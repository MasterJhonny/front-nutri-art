import React, { useState } from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const styledSelector = {
    width: '222px',
    margin: 1
}

export default function ComboSelector({ field }) {

  const [typeOperation, setTypeOperation] = useState("");
  console.log("🚀 ~ file: ComboSelector.jsx:13 ~ ComboSelector ~ typeOperation:", typeOperation)

  const handleChange = (event) => {
    setTypeOperation(event.target.value);
  };

  return (
    <div>
      <FormControl sx={styledSelector} variant="outlined">
        <InputLabel id="select-outlined-label">Tipo de Operación</InputLabel>
        <Select
          labelId="select-outlined-label"
          id="demo-simple-select-outlined"
          value={typeOperation}
          onChange={handleChange}
          label="type"
          required
          {...field}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Entrada</MenuItem>
          <MenuItem value={2}>Salida</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
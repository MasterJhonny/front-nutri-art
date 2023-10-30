import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const styledSelector = {
    width: '222px',
    margin: 1
}

const styleInput = {
  margin: 1,
};


export default function ComboSelectorEvent ({ control }) {

  const [typeOperation, setTypeOperation] = useState(1);
  const [disabledInput, setdisabledInput] = useState(false);
  
  const handleChange = (event) => {
    const typeOper = event.target.value;
    setTypeOperation(typeOper);
    setdisabledInput(!disabledInput)
  };

  return (
    <div>
      <TextField
        sx={styledSelector}
        id="select-option"
        select
        value={typeOperation}
        onChange={handleChange}
        defaultValue={1}
        required
      >
        <MenuItem value={1}>entrada</MenuItem>
        <MenuItem value={2}>salida</MenuItem>
      </TextField>
      <Controller
        name="currentUnitCost"
        control={control}
        render={({ field }) => (
          <TextField
            sx={styleInput}
            id="standard-basic"
            label="CU"
            type="number"
            required
            disabled={disabledInput}
            {...field}
          />
        )}
      />
    </div>
  );
}
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

const Input = ({ ctrlName, placeHolder, disabled, rowData, editControl, keyIndex }) => {
    const { control } = useFormContext();
    // console.log(rowData, editControl)
    console.log(`${ctrlName}[${keyIndex}]`)
    return (
        <Controller
            fullWidth
            variant="outlined"
            size="small"
            disabled={rowData && rowData.key !== editControl}
            name={ctrlName}
            // name={`table[${keyIndex}].${ctrlName}`}
            defaultValue={placeHolder || ""}
            as={TextField}
            control={control}
        />
    );
};

export default Input;

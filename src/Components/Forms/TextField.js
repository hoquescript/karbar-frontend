import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

const Input = ({ ctrlName, placeHolder, rowData, editControl }) => {
    const { control, errors } = useFormContext();
    return (
        <>
            <Controller
                fullWidth
                variant="outlined"
                size="small"
                disabled={rowData && rowData.key !== editControl}
                name={ctrlName}
                defaultValue={placeHolder || ""}
                as={TextField}
                control={control}
                rules={{required: true, maxLength: 2}}
                error={errors[ctrlName]}
                helperText={errors[ctrlName] && '* Your Input is Required'}
            />
        </>
    );
};

export default Input;

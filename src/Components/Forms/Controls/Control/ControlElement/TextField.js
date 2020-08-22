import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
  
const Input = ({ ctrlName, controlLabel, placeHolder, rowData, editControl, isTabControl }) => {
    const { control, errors } = useFormContext();
    console.log(isTabControl)

    return (
        <>
            <Controller
                fullWidth
                variant="outlined"
                label={isTabControl ? controlLabel : null}
                className={isTabControl ? 'tabTextField' : null}
                size="small"
                disabled={rowData && rowData.key !== editControl}
                name={ctrlName}
                defaultValue={placeHolder || ""}
                as={TextField}
                control={control}
                // rules={{required: true, maxLength: 2}}
                error={errors && errors[ctrlName] ? true : false}
                helperText={errors[ctrlName] && '* Your Input is Required'}
            />
        </>
    );
};

export default Input;

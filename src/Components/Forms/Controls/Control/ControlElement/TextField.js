import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
  
const Input = (props) => {
    // { ctrlName, controlLabel, placeHolder, rowData, editControl, isTabControl }
    const { control, errors } = useFormContext();
    const { name, label, disabled, defaultValue, isTabControl} = props
    // console.log(props)

    return (
        <>
            <Controller
                fullWidth
                variant="outlined"
                label={isTabControl ? label : null}
                className={isTabControl ? 'tabTextField' : null}
                size="small"
                disabled={disabled}
                // disabled={rowData && rowData.key !== editControl}
                // name={ctrlName}
                name={name}
                // defaultValue={placeHolder || ""}
                defaultValue={defaultValue}
                as={TextField}
                control={control}
                // rules={{required: true, maxLength: 2}}
                error={errors && errors[name] ? true : false}
                helperText={errors[name] && '* Your Input is Required'}
                style={{backgroundColor: '#313743'}}
            />
        </>
    );
};

export default Input;

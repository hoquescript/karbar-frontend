import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "@material-ui/core";

const Input = ({ ctrlName, placeHolder }) => {
    const { register } = useFormContext();
    return (
        <TextField
            variant="outlined"
            size="small"
            name={ctrlName}
            inputRef={register}
            fullWidth
            placeholder={placeHolder}
            value={placeHolder || null}
            id={ctrlName}
        />
    );
};

export default Input;

{
    /* <TextField
variant="outlined"
margin="normal"
required
fullWidth
id="name"
onChange={handleChange}
value={values.name}
label="Full Name"
name="name"
autoComplete="name"
InputLabelProps={{ className: classes.label }}
style={{ marginBottom: xs ? 0 : "2rem" }}
/> */
}

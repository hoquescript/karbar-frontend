import React from 'react';
import { TextField } from '@material-ui/core';

const Input = ({ctrlName, ctrlLabel, register}) => {
    return (
        <TextField variant="outlined" name={ctrlName} inputRef={register} style={{width: '100%'}} id={ctrlName}/>
    )
}

export default Input;

{/* <TextField
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
/> */}

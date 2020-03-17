import React from 'react'
import { TextField, Typography } from "@material-ui/core";

const Label = (props) => {
    return (
        <Typography>{props.children}</Typography>       
    )
}

export default Label

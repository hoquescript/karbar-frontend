import React from 'react'
import { TextField, Typography } from "@material-ui/core";

const Label = (props) => {
    return (
        <Typography style={{width: 200}}>{props.children}</Typography>       
    )
}

export default Label

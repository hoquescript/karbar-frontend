import React from 'react'
import { Typography } from "@material-ui/core";

const Label = (props) => {
    return (
        <Typography>{props.children}</Typography>       
    )
}

export default Label

import React from "react";
import { Grid } from "@material-ui/core";

import TextField from "./TextField";
import ComboBox from "./ComboBox";
import DatePicker from "./DatePicker";
import Label from "./Label";
import ChipField from "./ChipField";

const Control = props => {
    const {
        ControlLabel,
        ControlElementType,
        ControlName,
        Params,
        IsGridControl,
        Placeholder
    } = props;
    let inputEl;
    switch (ControlElementType.trim()) {
        case "textfield":
            inputEl = <TextField ctrlName={ControlName} placeHolder={Placeholder}/>;
            break;
        case "select":
            inputEl = (
                <ComboBox
                    ctrlName={ControlName}
                    ctrlLabel={ControlLabel}
                    params={Params}
                    placeHolder={Placeholder}
                />
            );
            break;
        case "date":
            inputEl = <DatePicker ctrlName={ControlName} />;
            break;
        case "chipfield":
            inputEl = <ChipField />;
            break;
        default:
            break;
    }

    return !IsGridControl ? (
        <Grid
            item
            container
            direction="row"
            alignItems="center"
            justify="space-around"
            xs={12}
            style={{ marginBottom: 20 }}
        >
            <Grid item xs={3}>
                <Label>{ControlLabel}</Label>
            </Grid>
            <Grid item xs={9}>
                {inputEl}
            </Grid>
        </Grid>
    ) : inputEl;
};

export default Control;

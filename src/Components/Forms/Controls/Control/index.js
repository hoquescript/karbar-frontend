import React from "react";
import { Grid } from "@material-ui/core";

import Label from "./ControlElement/Label";
import TextField from "./ControlElement/TextField";
import PriceField from "./ControlElement/PriceField";
import ChipField from "./ControlElement/ChipField";
import ComboBox from "./ControlElement/ComboBox";
import DatePicker from "./ControlElement/DatePicker";

const Control = props => {
    const { control, name, placeholder, rowData, editControl, value } = props;
    const { ControlLabel, ControlElementType, ControlName, IsGridControl, Params } = control;

    let inputEl;
    switch (ControlElementType && ControlElementType.trim()) {
        case "txt":
            inputEl = (
                <TextField
                    ctrlName={name || ControlName.trim()}
                    placeHolder={placeholder}
                    rowData={rowData}
                    editControl={editControl}
                />
            );
            break;
        case "cbo":
            inputEl = (
                <ComboBox
                    ctrlName={name || ControlName}
                    params={Params}
                    placeHolder={placeholder}
                    rowData={rowData}
                    editControl={editControl}
                />
            );
            break;
        case "dtp":
            inputEl = <DatePicker ctrlName={name || ControlName} />;
            break;
        case "chp":
            inputEl = <ChipField />;
            break;
        case "dec":
            inputEl = (
                <PriceField
                    ctrlName={name || ControlName}
                    placeHolder={placeholder}
                    rowData={rowData}
                    editControl={editControl}
                    value={value}
                />
            );
            break;
    
        default:
            inputEl = (
                <TextField
                    ctrlName={ControlName}
                    placeHolder={'Default'}
                    rowData={rowData}
                    editControl={editControl}
                />
            );
            break;
    }

    return !IsGridControl ? (
        <Grid
            item
            container
            direction="row"
            alignItems="center"
            justify="space-around"
            xs={9}
            style={{ marginBottom: 20 }}
        >
            <Grid item xs={3}>
                <Label>{ControlLabel}</Label>
            </Grid>
            <Grid item xs={9}>
                {inputEl}
            </Grid>
        </Grid>
    ) : (
        inputEl
    );
};

export default Control;

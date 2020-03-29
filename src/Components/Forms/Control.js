import React from "react";
import { Grid } from "@material-ui/core";

import TextField from "./TextField";
import PriceField from "./PriceField";
// import TextField from "./TextField";
import ComboBox from "./ComboBox";
import DatePicker from "./DatePicker";
import Label from "./Label";
import ChipField from "./ChipField";

const Control = props => {
    const { ControlLabel, ControlElementType, ControlName, IsGridControl, Params, Placeholder, rowData, editControl } = props;

    let inputEl;
    switch (ControlElementType && ControlElementType.trim()) {
        case "txt":
            inputEl = (
                <TextField
                    ctrlName={ControlName}
                    placeHolder={Placeholder}
                    rowData={rowData}
                    editControl={editControl}
                />
            );
            break;
        case "cbo":
            inputEl = (
                <ComboBox
                    ctrlName={ControlName}
                    params={Params}
                    placeHolder={Placeholder}
                    rowData={rowData}
                    editControl={editControl}
                />
            );
            break;
        case "dtp":
            inputEl = <DatePicker ctrlName={ControlName} />;
            break;
        case "chp":
            inputEl = <ChipField />;
            break;
        case "cur":
            inputEl = (
                <PriceField
                    ctrlName={ControlName}
                    placeHolder={Placeholder}
                    rowData={rowData}
                    editControl={editControl}
                />
            );
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
    ) : (
        inputEl
    );
};

export default Control;

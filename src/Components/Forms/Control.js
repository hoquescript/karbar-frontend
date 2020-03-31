import React from "react";
import { Grid } from "@material-ui/core";

import Label from "../Util/ControlElement/Label";
import TextField from "../Util/ControlElement/TextField";
import PriceField from "../Util/ControlElement/PriceField";
import ChipField from "../Util/ControlElement/ChipField";
import ComboBox from "../Util/ControlElement/ComboBox";
import DatePicker from "../Util/ControlElement/DatePicker";

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
        case "dec":
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

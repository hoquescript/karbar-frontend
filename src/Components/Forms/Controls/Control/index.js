import React from "react";
import { Grid } from "@material-ui/core";

import Label from "./ControlElement/Label";
import TextField from "./ControlElement/TextField";
import PriceField from "./ControlElement/PriceField";
import ChipField from "./ControlElement/ChipField";
import ComboBox from "./ControlElement/ComboBox";
import DatePicker from "./ControlElement/DatePicker";

const Control = props => {
    const { type } = props;
    // const { control, name, placeholder, rowData, editControl, value, props.isTabControl } = props;
    // const { ControlLabel, ControlElementType, ControlName, isGridControl, Params } = control;
    let inputEl;
    switch (type) {
        case "txt":
            inputEl = <TextField {...props}/>
            break;
        case "cbo":
            inputEl = <ComboBox {...props}/>
            break;
        case "dtp":
            inputEl = <DatePicker {...props}/>;
            break;
        case "chp":
            inputEl = <ChipField/>;
            break;
        case "dec":
            inputEl = <PriceField {...props}/>
            break;
        default:
            inputEl = <TextField {...props} label="Default"/>
    }

    return !props.isGridControl ? (
        <Grid
            item
            container
            direction="row"
            alignItems="center"
            justify="space-around"
            xs={props.isTabControl ? 12 : 9}
            style={{ marginBottom: props.isTabControl ? 10 : 20 }}
        >   
        {
            props.isTabControl ? null : (
            <Grid item xs={3}>
                <Label>{props.label}</Label>
            </Grid>
            )
        }
            <Grid item xs={props.isTabControl ? 12 : 9}>
                {inputEl}
            </Grid>
        </Grid>
    ) : (
        inputEl
    );
};

export default Control;


// switch (ControlElementType && ControlElementType.trim()) {
//     case "txt":
//         inputEl = (
//             <TextField
//                 ctrlName={name || ControlName}
//                 placeHolder={placeholder}
//                 rowData={rowData}
//                 editControl={editControl}
//                 controlLabel = {ControlLabel}
//                 props.isTabControl = {props.isTabControl}
//             />
//         );
//         break;
//     case "cbo":
//         inputEl = (
//             <ComboBox
//                 ctrlName={name || ControlName}
//                 params={Params}
//                 placeHolder={placeholder}
//                 rowData={rowData}
//                 editControl={editControl}
//                 controlLabel = {ControlLabel}
//                 props.isTabControl = {props.isTabControl}
//             />
//         );
//         break;
//     case "dtp":
//         inputEl = <DatePicker ctrlName={name || ControlName} controlLabel = {ControlLabel}/>;
//         break;
//     case "chp":
//         inputEl = <ChipField props.isTabControl/>;
//         break;
//     case "dec":
//         inputEl = (
//             <PriceField
//                 ctrlName={name || ControlName}
//                 placeHolder={placeholder}
//                 rowData={rowData}
//                 editControl={editControl}
//                 value={value}
//                 controlLabel={ControlLabel}
//                 props.isTabControl={props.isTabControl}
//             />
//         );
//         break;

//     default:
//         inputEl = (
//             <TextField
//                 ctrlName={ControlName}
//                 placeHolder={'Default'}
//                 rowData={rowData}
//                 editControl={editControl}
//                 controlLabel = {ControlLabel}
//                 props.isTabControl
//             />
//         );
//         break;
// }

// return !isGridControl ? (
//     <Grid
//         item
//         container
//         direction="row"
//         alignItems="center"
//         justify="space-around"
//         xs={props.isTabControl ? 12 : 9}
//         style={{ marginBottom: props.isTabControl ? 10 : 20 }}
//     >   
//     {
//         props.isTabControl ? null : (
//         <Grid item xs={3}>
//             <Label>{ControlLabel}</Label>
//         </Grid>
//         )
//     }
//         <Grid item xs={props.isTabControl ? 12 : 9}>
//             {inputEl}
//         </Grid>
//     </Grid>
// ) : (
//     inputEl
// );

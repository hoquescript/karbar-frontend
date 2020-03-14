import React from "react";

import TextField from "./TextField";
import ComboBox from "./ComboBox";
import DatePicker from "./DatePicker";
import GridView from "./GridView";
import { Typography, Grid } from "@material-ui/core";
import Label from "./Label";

const Control = (props) => {
	const {ControlName, ControlLabel, ControlElementType, MenuButton, Params} = props;

	let inputEl;
	console.log(props)
	switch (ControlName.slice(0, 3)) {
		case "txt":
			inputEl = <TextField ctrlName={ControlName} ctrlLabel={ControlLabel} />;
			break;
		case "cbo":
			inputEl = <ComboBox ctrlName={ControlName} ctrlLabel={ControlLabel} params={Params} />;
			break;
		case "dtp":
			inputEl = <DatePicker />;
			break;
		// case "dgv":
		// 	inputEl = <DatePicker />;
		// 	break;
		default:
			break;
	}
	return (
		<Grid
			item
			container
			direction="row"
			alignItems="center"
			xs={12}
			style={{ marginBottom: 0 }}
		>
			<Grid item xs={4}>
				<Label>{ControlLabel}</Label>
			</Grid>
			<Grid item xs={8}>
				{inputEl}
			</Grid>
		</Grid>
	);
};

export default Control;

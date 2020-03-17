import React from "react";
import { Typography, Grid } from "@material-ui/core";

import TextField from "./TextField";
import ComboBox from "./ComboBox";
import DatePicker from "./DatePicker";
import GridView from "./GridView";

import Label from "./Label";
import Tree from "./Tree";

const Control = (props) => {
	const {ControlName, ControlLabel, ControlElementType, MenuButton, Params} = props;
	let inputEl;
	// console.log(props)
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
		case "dgv":
			inputEl = <GridView />;
			break;
		case "Tre":
			inputEl = <Tree params={Params}/>;
			break;
		default:
			break;
	}
	return (
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
	);
};

export default Control;

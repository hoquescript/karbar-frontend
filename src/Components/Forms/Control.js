import React from "react";
import { Grid } from "@material-ui/core";

import TextField from "./TextField";
import ComboBox from "./ComboBox";
import DatePicker from "./DatePicker";
import Label from "./Label";
import ChipField from "./ChipField";

const Control = (props) => {
	const { ControlLabel, ControlName, Params } = props;
	let inputEl;
	switch (ControlName.slice(0, 3)) {
		case "txt":
			inputEl = < TextField ctrlName={ControlName} />;
			break;
		case "cbo":
			inputEl = < ComboBox ctrlName={ControlName} ctrlLabel={ControlLabel} params={Params} />;
			break;
		case "dtp":
			inputEl = < DatePicker ctrlName={ControlName} />;
			break;
		case "chp":
			inputEl = < ChipField />;
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

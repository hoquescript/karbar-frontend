import React from "react";
import { Grid } from "@material-ui/core";

import TextField from "./TextField";
import ComboBox from "./ComboBox";
import DatePicker from "./DatePicker";
import GridView from "./GridView";
import Label from "./Label";
import Tree from "./Tree";
import ChipField from "./ChipField";

const Control = (props) => {
	const {ControlName, ControlLabel, ControlElementType, Params, Controller, control, register, chipData} = props;
	let inputEl;
	// console.log(props)
	switch (ControlName.slice(0, 3)) {
		case "txt":
			// if(ControlName === "txtACodeHeadX"){
			// 	console.log(1)
			// 	inputEl = <ChipField ctrlName={ControlName} ctrlLabel={ControlLabel} register={register}/>;
			// }
			inputEl = <ChipField ctrlName={ControlName} chipData={chipData} ctrlLabel={ControlLabel} register={register}/>;
			break;
		case "cbo":
			inputEl = <ComboBox ctrlName={ControlName} ctrlLabel={ControlLabel} params={Params} Controller={Controller} control={control} register={register}/>;
			break;
		case "dtp":
			inputEl = <DatePicker ctrlName={ControlName} Controller={Controller} control={control} register={register}/>;
			break;
		// case "dgv":
		// 	inputEl = <GridView />;
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

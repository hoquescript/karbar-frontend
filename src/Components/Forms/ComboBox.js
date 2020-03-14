import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const ComboBox = ({ctrlName, ctrlLabel, params}) => {
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
	console.log(ctrlName)
	return (
		<FormControl variant="outlined" style={{width:"100%"}}>
			<InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
				{ctrlLabel}
			</InputLabel>
			<Select
				id={ctrlName}
				// autoWidth
				autoComplete
				value={''}
				// onChange={handleChange}
				labelWidth={labelWidth}
			>
				{
					params && params.length>0 ? 
					params.map(({ACode, AHead}) => (
						<MenuItem value={ACode} key={ACode}>{AHead}</MenuItem>
					)) : 
					<MenuItem value=''>None</MenuItem>
				}
			</Select>
		</FormControl>
	);
};

export default ComboBox;

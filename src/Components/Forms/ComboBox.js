import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const ComboBox = () => {
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

	return (
		<FormControl variant="outlined" style={{width:"100%"}}>
			<InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
				Age
			</InputLabel>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				autoWidth
				// value={age}
				// onChange={handleChange}
				labelWidth={labelWidth}
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>
		</FormControl>
	);
};

export default ComboBox;

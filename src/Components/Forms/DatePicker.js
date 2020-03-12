import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker
} from "@material-ui/pickers";

const DatePicker = () => {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				variant="inline"
				inputVariant="outlined"
				format="MM/dd/yyyy"
				margin="normal"
				// id="date-picker-inline"
				// label="Date picker inline"
				// value={selectedDate}
				// onChange={handleDateChange}
				KeyboardButtonProps={{
					"aria-label": "change date"
				}}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default DatePicker;

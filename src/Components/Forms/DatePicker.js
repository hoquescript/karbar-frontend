import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker
} from "@material-ui/pickers";

const DatePicker = ({ctrlName, Controller, control}) => {
	const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

	const handleDateChange = date => {
	  setSelectedDate(date);
	};
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>

		<Controller as={
				<KeyboardDatePicker
					disableToolbar
					variant="inline"
					inputVariant="outlined"
					format="MM/dd/yyyy"
					margin="normal"
					// id="date-picker-inline"
					// label="Date picker inline"
					value={selectedDate}
					// onChange={handleDateChange}
					KeyboardButtonProps={{
						"aria-label": "change date"
					}}
				/>
		}
		control={control}
		name={ctrlName}/>
					</MuiPickersUtilsProvider>

	);
};

export default DatePicker;

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";

const DatePicker = ({ ctrlName }) => {
	const { control } = useFormContext();

    const [selectedDate, setSelectedDate] = React.useState(
        new Date("2014-08-18T21:11:54")
    );
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
                as={
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        value="2014-08-18T21:11:54"
                    />
                }
                control={control}
                name={ctrlName}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;

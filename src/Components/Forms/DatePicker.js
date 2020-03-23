import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

const DatePicker = ({ ctrlName }) => {
    const { control } = useFormContext();
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
                as={
                    <KeyboardDatePicker
                        clearable
                        autoOk
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        margin="normal"
                        size="small"
                    />
                }
                control={control}
                name={ctrlName}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;

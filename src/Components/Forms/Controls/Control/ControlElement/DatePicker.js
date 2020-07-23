import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

const DatePicker = ({ ctrlName }) => {
    const { control, errors } = useFormContext();
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
                as={
                    <KeyboardDatePicker
                        clearable
                        autoOk
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        size="small"
                    />
                }
                control={control}
                name={ctrlName}
                defaultValue=""
                // rules={{required: true}}
                error={errors && errors[ctrlName] ? true : false}
                helperText={errors[ctrlName] && '* Your Input is Required'}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;

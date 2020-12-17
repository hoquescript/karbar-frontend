import React from "react";
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";

const ComboBox = (props) => {
    const { control, errors } = useFormContext();
    const { darkMode, name, label, params, disabled, defaultValue, isTabControl} = props

    return (
        <FormControl variant="outlined" size="small" name={name} style={{ width: "100%" }} error={errors && errors[name] ? true : false}>
            <InputLabel style={{fontSize: '1.3rem'}}>{isTabControl ? label : null}</InputLabel>
            <Controller
                as={
                    <Select value={""}>
                        {params && params.length > 0 ? (
                            params.map(({ ACode, AHead }) => (
                                <MenuItem value={ACode ? ACode : ""} key={ACode}>
                                    {AHead}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="None">None</MenuItem>
                        )}
                    </Select>
                }
                name = {name}
                disabled = {disabled}
                defaultValue = {defaultValue}
                control = {control}
                style={ darkMode ? {backgroundColor: '#313743'} : null}
                // rules={{required: true}}
            />
            <FormHelperText>{errors[name] && '⚠️ Your Input is Required'}</FormHelperText>
        </FormControl>
    );
};
export default ComboBox;

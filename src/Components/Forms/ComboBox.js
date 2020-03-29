import React from "react";
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";

const ComboBox = ({ctrlName, params, placeHolder, rowData, editControl}) => {
    const { control, errors } = useFormContext();
    return (
        <FormControl variant="outlined" size="small" name={ctrlName} style={{ width: "100%" }} error={errors[ctrlName]}>
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
                name = {ctrlName}
                defaultValue = {placeHolder || ''}
                disabled = {rowData && rowData.key !== editControl}
                control = {control}
                rules={{required: true}}
            />
            <FormHelperText>{errors[ctrlName] && '⚠️ Your Input is Required'}</FormHelperText>
        </FormControl>
    );
};
export default ComboBox;

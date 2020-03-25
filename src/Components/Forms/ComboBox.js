import React from "react";
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const ComboBox = ({ctrlName, ctrlLabel, params, placeHolder, disabled}) => {
    const { control } = useFormContext();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);
    return (
        <FormControl variant="outlined" size="small" name={ctrlName} style={{ width: "100%" }}>
            {/* <InputLabel ref={inputLabel}>{ctrlLabel}</InputLabel> */}
            <Controller
                as={
                    <Select value={""} labelWidth={labelWidth}>
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
                disabled = {disabled}
                control = {control}
            />
        </FormControl>
    );
};

export default ComboBox;

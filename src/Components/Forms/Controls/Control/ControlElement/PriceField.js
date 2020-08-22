import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import taka from "../../../../../Assets/Taka.svg";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    control: {
        '& div': {
            '& input': {
                textAlign: 'right',
                marginLeft: '22%'
            }
        }
    },
    iconWrapper: {
        width: "25%",
        height: "36px",
        backgroundColor: '#eee',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        left: 2,
    },
    icon: {
        height: 18,
        width: 15
    }
});

const PriceField = ({ ctrlName, controlLabel, placeHolder, rowData, editControl, value , isTabControl, }) => {
    const classes = useStyles();
    
    const { control } = useFormContext();
    return (
        <div className={classes.root}>
            {
                value ? <TextField variant="outlined" size="small" className={classes.control} disabled value={value}/> : (
                <Controller
                    fullWidth
                    variant="outlined"
                    label={isTabControl ? controlLabel : null}
                    className={isTabControl ? `tabTextField` : classes.control}    
                    size="small"
                    disabled={rowData && rowData.key !== editControl}
                    name={ctrlName}
                    defaultValue={placeHolder}
                    as={TextField}
                    control={control}
                    placeholder='0.00'
                />
            )}
            {!isTabControl && ( 
            <div className={classes.iconWrapper}>
                <img src={taka} className={classes.icon} alt='$'/>
            </div>
            )}
        </div>
    );
};

export default PriceField;


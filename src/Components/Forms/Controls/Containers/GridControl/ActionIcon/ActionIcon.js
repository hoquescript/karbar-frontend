import React from "react";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {
    addGridControl, 
    editGridControl, 
    deleteGridControl, 
    deleteAllGridControl,
} from '../../../../../../Store/form'
import { useFormContext } from "react-hook-form";
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    iconHolder: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: theme.palette.drawer.side.selectedMenuBackground,
        color: theme.palette.primary.light,
        fontSize: 16,
        cursor: "pointer"
    }
}));

const ActionIcon = ({ type, tabIndex, rowData, defaultValues, editControl, setEditControl}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleSubmit, reset} = useFormContext();

    const addBtnHandler = data => {
        console.log(data, data.decDebit, data.decCredit)
        if(+data.decDebit > -1 && +data.decCredit > -1){
            if(+data.decDebit > 0 && +data.decCredit > 0)
                return alert('Debit & Credit cant be valued together')
            else if(+data.decDebit === 0 && +data.decCredit === 0)
                return alert('Debit & Credit cant be both Zero')
            console.log(data.decDebit, data.decCredit)
        }
        dispatch(addGridControl({tabIndex, gridControl: { key: uuid(), ...data  }}));
        reset(defaultValues);
    };

    const deleteAllBtnHandler = data => {
        dispatch(deleteAllGridControl({tabIndex}));
    };

    const editBtnHandler = () => {
        setEditControl(rowData.key)
    };

    const saveBtnHandler = data => {
        dispatch(editGridControl({tabIndex, key: rowData.key, gridControl: data[rowData.key]}));
        setEditControl('')
    };

    const deleteBtnHandler = data => {
        dispatch(deleteGridControl({tabIndex, key: rowData.key}));
    };

    return type === "add" ? (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <IconButton color="primary" className={classes.iconHolder} onClick={handleSubmit(addBtnHandler)} style={{marginRight: 10}}>
                <PlusOutlined />
            </IconButton>
            <IconButton color="primary" className={classes.iconHolder} onClick={deleteAllBtnHandler}>
                <DeleteOutlined />
            </IconButton>
        </div>
    ) 
    : 
    (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <IconButton 
                color="primary" 
                className={classes.iconHolder} 
                onClick={rowData && rowData.key === editControl ? handleSubmit(saveBtnHandler) : editBtnHandler} 
                style={{marginRight: 10}}
            >
                {rowData && rowData.key === editControl ? <SaveOutlined/> : <EditOutlined />}
            </IconButton>
            <IconButton color="primary" className={classes.iconHolder} onClick={deleteBtnHandler}>
                <CloseOutlined/>
            </IconButton>
        </div>
    );
};

export default ActionIcon;
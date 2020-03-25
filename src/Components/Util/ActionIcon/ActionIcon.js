import React from "react";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
    addGridControlData,
    editGridControlData,
    deleteGridControlData,
    deleteAllGridControlData
} from "../../../Store/Actions/forms";
import { useFormContext } from "react-hook-form";
import { MdAdd, MdEdit, MdDeleteSweep, MdSave } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { Grid, IconButton } from "@material-ui/core";

const useStyles = makeStyles({
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
        // width: 30,
        // height: 30,
        borderRadius: "50%",
        backgroundColor: '#e6f7ff',
        // padding: 5,
        fontSize: 18,
        cursor: "pointer"
    }
});

const ActionIcon = ({ type, rowData, defaultValues, isControlEditMode, setIsControlEditMode ,editControl, setEditControl, rd }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleSubmit, reset} = useFormContext();

    const addBtnHandler = data => {
        dispatch(addGridControlData({ ...data, key: uuid() }));
        reset(defaultValues);
    };

    const deleteAllBtnHandler = data => {
        dispatch(deleteAllGridControlData());
    };

    const editBtnHandler = () => {

        setEditControl(rowData.key)
        setIsControlEditMode(true)
    };

    const saveBtnHandler = data => {
        console.log(data)
        const defaultValues = {}
        Object.keys(data).forEach(k => defaultValues[k] = '')
        dispatch(editGridControlData(rowData.key, data));
        reset(defaultValues);
        setEditControl('')

        setIsControlEditMode(false)
    };

    const deleteBtnHandler = data => {
        dispatch(deleteGridControlData(rowData.key));
    };

    return type === "add" ? (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <IconButton color="primary" className={classes.iconHolder} onClick={handleSubmit(addBtnHandler)} style={{marginRight: 10}}>
                <MdAdd />
            </IconButton>
            <IconButton color="primary" className={classes.iconHolder} onClick={deleteAllBtnHandler}>
                <MdDeleteSweep />
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
                {rowData && rowData.key === editControl ? <MdSave/> : <MdEdit />}
            </IconButton>
            <IconButton color="primary" className={classes.iconHolder} onClick={deleteBtnHandler}>
                <AiTwotoneDelete />
            </IconButton>
        </div>
    );
};

export default ActionIcon;

{/* <div className={classes.root}>
<div
    style={{
        backgroundColor: "#00aa0063",
        marginRight: 5,
        color: "#157915"
    }}
    className={classes.iconHolder}
    onClick={editBtnHandler}
>
    <MdEdit />
</div>
<div
    style={{
        backgroundColor: "rgba(255, 0, 0, 0.29)",
        color: "rgb(217, 20, 20)"
    }}
    className={classes.iconHolder}
    
>
    <AiTwotoneDelete />
</div>
</div> */}


        // <Button
        //     variant="outlined"
        //     color="primary"
        //     startIcon={<MdAdd style={{ marginRight: "-7px" }} />}
        //     style={{ borderRadius: 15, textTransform: "capitalize" }}
        //     onClick={handleSubmit(addBtnHandler)}
        // >
        //     Add
        // </Button>

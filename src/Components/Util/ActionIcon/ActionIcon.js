import React from "react";
import { v4 as uuid } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { addGridControlData, editGridControlData, deleteGridControlData } from "../../../Store/Actions/forms";
import { useFormContext } from "react-hook-form";
import { MdAdd, MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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
        width: 30,
        height: 30,
        borderRadius: "50%",
        padding: 5,
        fontSize: 18,
        cursor: "pointer"
    }
});

const ActionIcon = ({ type, rowData }) => {
    const classes = useStyles();
    const { handleSubmit } = useFormContext();
    const dispatch = useDispatch();
    
    const addBtnHandler = data => {
        dispatch(addGridControlData({ ...data, key: uuid() }));
    };
    const editBtnHandler = data => {
        dispatch(editGridControlData({ ...data, key: uuid() }));
    };
    const deleteBtnHandler = data => {
        dispatch(deleteGridControlData(rowData.key));
    };

    // console.log(rowData)
    return type === "add" ? (
        <Button
            variant="outlined"
            color="primary"
            startIcon={<MdAdd style={{ marginRight: "-7px" }} />}
            style={{ borderRadius: 15, textTransform: "capitalize" }}
            onClick={handleSubmit(addBtnHandler)}
        >
            Add
        </Button>
    ) : (
        <div className={classes.root}>
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
                onClick={deleteBtnHandler}
            >
                <AiTwotoneDelete />
            </div>
        </div>
    );
};

export default ActionIcon;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, useFieldArray, FormContext } from "react-hook-form";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from "@material-ui/core";
import Control from "../Control";
import ActionIcon from "../../Util/ActionIcon/ActionIcon";
import GridControlHead from "./GridControlHead";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));

const GridControl = ({ controls }) => {
    const classes = useStyles();
    const defaultValues = {}
    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const refs = controls.map(ctrl => ctrl.ControlName);
    refs.forEach(ref => {
        defaultValues[ref] = ''
    });

    const gridRowControlForm = useForm({defaultValues});
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
        {
            control:  gridRowControlForm.control,
            name: "table"
        }
    );

    const addFriend = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };
    console.log(indexes)
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <FormContext {...gridRowControlForm}>
                <TableContainer>
                    <Table className={classes.table}>
                        <GridControlHead
                            classes={classes}
                            headCells={controls}
                            isControlEditMode={isControlEditMode}
                            defaultValues={defaultValues}
                            addFriend={addFriend}
                        />
                        <TableBody>

                        </TableBody>
                    </Table>
                </TableContainer>
                </FormContext>

            </Paper>
        </div>
    );
}

export default GridControl;


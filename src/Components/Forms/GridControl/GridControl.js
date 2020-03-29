import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, FormContext } from "react-hook-form";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@material-ui/core";
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
    const refs = controls.map(ctrl => ctrl.ControlName);
    refs.forEach(ref => {
        defaultValues[ref] = ''
    });

    const [editControl, setEditControl] = useState('')
    const [isControlEditMode, setIsControlEditMode] = useState(false)
    const gridControlData = useSelector(state => state.forms.gridControlData);
    const gridRowControlForm = useForm({defaultValues});
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table className={classes.table}>
                        <GridControlHead
                            classes={classes}
                            headCells={controls}
                            // isControlEditMode={isControlEditMode}
                            defaultValues={defaultValues}
                        />
                        <TableBody>
                            {gridControlData && gridControlData.map((data) => (
                            <TableRow key={data.key}>
                                <FormContext {...gridRowControlForm}>
                                    {controls.map((ctrl,index) => (
                                    <TableCell align="center" key={ctrl.ControlName} style={{borderRight: '1px solid rgb(210, 225, 238)'}}>
                                        <Control
                                            Placeholder={data[ctrl.ControlName]}
                                            editControl={editControl}
                                            rowData={data} 
                                            keyIndex = {index}
                                            {...ctrl}
                                        />
                                    </TableCell>
                                    ))}
                                    <TableCell>
                                        <ActionIcon 
                                            rowData={data} 
                                            defaultValues={defaultValues} 
                                            isControlEditMode={isControlEditMode} 
                                            setIsControlEditMode={setIsControlEditMode}
                                            editControl={editControl}
                                            setEditControl={setEditControl}
                                        />
                                    </TableCell>
                                </FormContext>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default GridControl;

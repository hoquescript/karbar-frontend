import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, FormContext } from "react-hook-form";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableFooter, TextField } from "@material-ui/core";
import Control from "../Control";
import ActionIcon from "../../Util/ActionIcon/ActionIcon";
import GridControlHead from "./GridControlHead";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: '1rem'
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: '75rem',
        background: theme.palette.background.table
    },
    totalCell:{
        borderLeft: `1px solid ${theme.palette.grey[200]}`
    },
    total:{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.drawer.side.selectedMenuBackground,
        borderRadius: '2rem',
        fontSize: '1.4rem',
        color: theme.palette.primary.light,
        padding: '1.1rem'
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

    const totalCounter = (ctrlName) => {
        return `${gridControlData.reduce((total, row) => total + parseInt(row[ctrlName] || 0), 0)}`
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table className={classes.table}>
                        <GridControlHead
                            classes={classes}
                            headCells={controls}
                            defaultValues={defaultValues}
                        />
                        <TableBody>
                            {gridControlData && gridControlData.map((data) => (
                                <TableRow key={data.key}>
                                <FormContext {...gridRowControlForm}>
                                    {controls.map((ctrl,index) => (
                                    <TableCell align="center" key={ctrl.ControlName} style={{borderRight: '1px solid rgb(210, 225, 238)'}}>
                                        <Control
                                            name = {`${data.key}[${ctrl.ControlName}]`}
                                            placeholder={data[ctrl.ControlName]}
                                            editControl={editControl}
                                            rowData={data} 
                                            keyIndex = {index}
                                            control={ctrl}
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
                            {gridControlData.length > 0 && (
                                <TableRow>
                                    {controls.map((ctrl) => 
                                        ctrl.ControlElementType === 'txt' || 
                                        ctrl.ControlElementType === 'cbo' || 
                                        ctrl.ControlElementType === 'dtp' ? <TableCell></TableCell> : (
                                            <TableCell className={classes.totalCell}>
                                                <Control value={totalCounter(ctrl.ControlName)} control={ctrl}/>
                                            </TableCell>
                                        )
                                    )}
                                    <TableCell className={classes.totalCell}>
                                        <span className={classes.total}>Total</span>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default GridControl;

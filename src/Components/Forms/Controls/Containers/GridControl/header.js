import React from "react";
import { useForm, FormContext } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Control from "../../Control";
import ActionIcon from "./ActionIcon/ActionIcon";

const useStyles = makeStyles(theme => ({
    // root: {
    //     backgroundColor: theme.palette.drawer.side.selectedMenuBackground
    // },
    // tableHead: {
    //     color: theme.palette.primary.light
    // },
    tableCell: {
        textAlign: "center",
        borderRight: `1px solid ${theme.palette.grey[200]}` ,
        borderBottom: `1px solid ${theme.palette.grey[200]}` 
    },
    actionCell: {
        textAlign: "center",
        width: `10%`,
        color: theme.palette.primary.light
    }
}));

const GridControlHead = props => {
    const classes = useStyles();
    const { headCells, defaultValues, tabIndex } = props;
    const gridControlForm = useForm({ defaultValues });

    return (
        <TableHead>
            <TableRow className={classes.root} style={{backgroundColor: tabIndex ? '#fff' : '#e6f7ff'}}>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.ControlName}
                        align="center"
                        className={classes.tableCell}
                        style={{width: `${headCell.GridWidth}%`}}
                    >
                        <TableSortLabel className={classes.tableHead} style={{color: tabIndex ? '#6386a7' : '#1890ff'}}>
                            {headCell.ControlLabel}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell className={classes.actionCell} style={{color: tabIndex ? '#6386a7' : '#1890ff'}}>
                    Action
                </TableCell>
            </TableRow>
            <TableRow>
                <FormContext {...gridControlForm}>
                    {headCells.map(ctrl => (
                    <TableCell
                        key={ctrl.ControlName}
                        align="center"
                        className={classes.tableCell}
                    >
                        <Control 
                            isGridControl
                            key={ctrl.ControlName}
                            type={ctrl.ControlElementType}
                            name={ctrl.ControlName}
                            params={ctrl.Params}
                        />
                    </TableCell>
                    ))}
                    <TableCell>
                        <ActionIcon type="add" defaultValues={defaultValues} tabIndex={tabIndex}/>
                    </TableCell>
                </FormContext>
            </TableRow>
        </TableHead>
    );
};

export default GridControlHead;

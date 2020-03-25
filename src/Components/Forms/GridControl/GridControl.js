import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, FormContext } from "react-hook-form";
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
    // const [state, setstate] = useState({})

    const defaultValues = {}
    const hookForm = {}
    const refs = controls.map(ctrl => ctrl.ControlName);
    refs.forEach(ref => {
        defaultValues[ref] = ''
        // hookForm[ref] = useForm()
    });

    const [editControl, setEditControl] = useState('')
    const [isControlEditMode, setIsControlEditMode] = useState(false)
    const gridControlData = useSelector(state => state.forms.gridControlData);
    const rd = {}
    // gridControlData.forEach(gc => {
    //     hookForm[gc.key] = useForm(defaultValues)
    // })
    // console.log(rd)
    // console.log(state)
    const gridRowControlForm = useForm({defaultValues});
    // console.log(rd)
    // refs.map()

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table className={classes.table}>
                        <GridControlHead
                            classes={classes}
                            headCells={controls}
                            isControlEditMode={isControlEditMode}
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
                                            disabled ={rd[data.key]}
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
                                            rd={rd}
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



                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                /> */}







// {stableSort(rows, getComparator(order, orderBy))
//     .slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     )
//     .map((row, index) => {
//         const isItemSelected = isSelected(
//             row.name
//         );
//         const labelId = `enhanced-table-checkbox-${index}`;
//         return (
//             <TableRow
//                 hover
//                 onClick={event =>
//                     handleClick(event, row.name)
//                 }
//                 role="checkbox"
//                 aria-checked={isItemSelected}
//                 tabIndex={-1}
//                 key={row.name}
//                 selected={isItemSelected}
//                 sty
//             >
//                 {/* <TableCell padding="checkbox">
// <Checkbox
// checked={isItemSelected}
// inputProps={{ 'aria-labelledby': labelId }}
// />
// </TableCell> */}
//                 <TableCell
//                     component="th"
//                     id={labelId}
//                     scope="row"
//                     padding="none"
//                 >
//                     {row.name}
//                 </TableCell>
//                 <TableCell align="right">
//                     {row.fat}
//                 </TableCell>
//                 <TableCell align="right">
//                     {row.carbs}
//                 </TableCell>
//                 <TableCell align="right">
//                     {row.protein}
//                 </TableCell>
//             </TableRow>
//         );
//     })}




    //-------------------------------------------------------- Start Form
    // const [order, setOrder] = React.useState("asc");
    // const [orderBy, setOrderBy] = React.useState("calories");
    // const [selected, setSelected] = React.useState([]);
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // const handleRequestSort = (event, property) => {
    //     const isAsc = orderBy === property && order === "asc";
    //     setOrder(isAsc ? "desc" : "asc");
    //     setOrderBy(property);
    // };

    // const handleSelectAllClick = event => {
    //     if (event.target.checked) {
    //         const newSelecteds = rows.map(n => n.name);
    //         setSelected(newSelecteds);
    //         return;
    //     }
    //     setSelected([]);
    // };

    // const handleClick = (event, name) => {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1)
    //         );
    //     }

    //     setSelected(newSelected);
    // };

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = event => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    // const isSelected = name => selected.indexOf(name) !== -1;

    // const emptyRows =
    //     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

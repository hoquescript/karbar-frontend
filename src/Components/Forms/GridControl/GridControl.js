import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, FormContext } from "react-hook-form";
import { Table, TableBody } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Control from "../Control";
import ActionIcon from "../../Util/ActionIcon/ActionIcon";
import GridControlHead from "./GridControlHead";
import GridControlToolbar from "./GridControlToolbar";

const rows = [];
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

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

export default function EnhancedTable({ controls }) {
    const classes = useStyles();
    const gridControlForm = useForm();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const gridControlData = useSelector(state => state.forms.gridControlData);
    const refs = controls.map(ctrl => ctrl.ControlName);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* <GridControlToolbar numSelected={selected.length} /> */}
                <FormContext {...gridControlForm}>
                    <TableContainer>
                        <Table className={classes.table}>
                            <GridControlHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={controls}
                            />
                            <TableBody>
                                <TableRow>
                                    {controls.map(ctrl => (
                                        <TableCell align="center" style={{borderRight: '1px solid rgb(210, 225, 238)'}}>
                                            <Control
                                                key={ctrl.ControlName}
                                                {...ctrl}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <ActionIcon type="add" />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {controls.map(ctrl => (
                                        <TableCell align="center" style={{borderRight: '1px solid rgb(210, 225, 238)'}}>
                                            <Control
                                                key={ctrl.ControlName}
                                                Placeholder={ctrl.ControlLabel}
                                                {...ctrl}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <ActionIcon/>
                                    </TableCell>
                                </TableRow>

                                {gridControlData
                                    ? gridControlData.map(data => (
                                          <TableRow>
                                              {refs.map(ref => (
                                                  <TableCell align="center" style={{borderRight: '1px solid rgb(210, 225, 238)'}}>
                                                      {data[ref]}
                                                  </TableCell>
                                              ))}
                                              <TableCell>
                                                  <ActionIcon rowData={data}/>
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </FormContext>
                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                /> */}
            </Paper>
        </div>
    );
}

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

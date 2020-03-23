import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

const GridControlHead = props => {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells
    } = props;

    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead style={{backgroundColor:'#e6f7ff'}}>
            <TableRow>
                {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell> */}
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.ControlName}
                        align="center"
                        style={{
                            textAlign: "center",
                            width: `${headCell.GridWidth.trim()}%`,
                            borderRight: '1px solid rgb(210, 225, 238)'
                        }}
                        // align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'default'}
                        // sortDirection={orderBy === headCell.ControlName ? order : false}
                    >
                        <TableSortLabel
                        // active={orderBy === headCell.ControlName}
                        // direction={orderBy === headCell.ControlName ? order : 'asc'}
                        // onClick={createSortHandler(headCell.ControlName)}
                        >
                          <div style={{color:'rgb(0, 109, 210)'}}>
                          {headCell.ControlLabel}
                          </div>
                            {/* {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null} */}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell style={{ textAlign: "center", width: `10%`, color:'rgb(0, 109, 210)'}}>
                    Action
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default GridControlHead;

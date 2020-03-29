import React from "react";
import { useForm, FormContext } from "react-hook-form";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Control from "../Control";
import ActionIcon from "../../Util/ActionIcon/ActionIcon";

const GridControlHead = props => {
    const { isControlEditMode, headCells, defaultValues } = props;
    const gridControlForm = useForm({ defaultValues });

    return (
        <TableHead>
            <TableRow style={{ backgroundColor: "#e6f7ff" }}>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.ControlName}
                        align="center"
                        style={{
                            textAlign: "center",
                            width: `${headCell.GridWidth}%`,
                            borderRight: "1px solid rgb(210, 225, 238)" 
                        }}
                    >
                        <TableSortLabel>
                            <span style={{ color: "rgb(0, 109, 210)" }}>
                                {headCell.ControlLabel}
                            </span>
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell
                    style={{
                        textAlign: "center",
                        width: `10%`,
                        color: "rgb(0, 109, 210)"
                    }}
                >
                    Action
                </TableCell>
            </TableRow>
            <TableRow>
                <FormContext {...gridControlForm}>
                    {headCells.map(ctrl => (
                    <TableCell
                        key={ctrl.ControlName}
                        align="center"
                        style={{
                            borderRight: "1px solid rgb(210, 225, 238)"
                        }}
                    >
                        <Control
                            disabled={isControlEditMode}
                            {...ctrl}
                        />
                    </TableCell>
                    ))}
                    <TableCell>
                        <ActionIcon type="add" defaultValues={defaultValues}/>
                    </TableCell>
                </FormContext>
            </TableRow>
        </TableHead>
    );
};

export default GridControlHead;

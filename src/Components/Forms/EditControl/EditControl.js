import React from 'react'
import { v4 as uuid } from "uuid";

import { TableContainer, Table, TableRow, TableHead, TableCell, TextField } from '@material-ui/core'
import { useForm, FormContext, useFormContext, Controller } from "react-hook-form";

const EditControl = ({data}) => {
    const heads = Object.keys(data[0]);
    const ctrlType = Object.values(data[0]);
    const { control, errors } = useFormContext();
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {heads.map(head => (
                            <TableCell key={head}>{head}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {
                    data.map(row => (
                        <TableRow key={uuid()}>
                            {heads.map(head => (
                                <TableCell key={uuid()}>
                                    <Controller
                                        fullWidth
                                        // variant="outlined"
                                        size="small"
                                        // disabled={rowData && rowData.key !== editControl}
                                        name={`data.${row.ACode}[${head}]`}
                                        defaultValue={row[head]}
                                        as={TextField}
                                        control={control}
                                        // rules={{required: true, maxLength: 2}}
                                        // error={errors && errors[ctrlName] ? true : false}
                                        // helperText={errors[ctrlName] && '* Your Input is Required'}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                }
            </Table>
        </TableContainer>
    )
}

export default EditControl

import React from "react";
import { useDispatch } from "react-redux";
import { useFormContext } from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";

import {
  addTabControl,
  editTabControl,
  deleteTabControl,
  deleteAllTabControl,
} from "../../../../../../Store/form";

const ActionButton = ({ style, id, index, editableForm, editModeHandler }) => {
  const dispatch = useDispatch();
  const { handleSubmit, reset } = useFormContext();
  const isEditable = editableForm && id === editableForm;

  const addTabForm = (values) => {
    const newValues = {}
    Object.keys(values).forEach(element => {
      if(typeof values[element] === 'object')
        return
      newValues[element] = values[element]
    });
    // console.log(newValues)
    dispatch(addTabControl({ index, values: newValues }));
    reset()
  };

  const editTabForm = () => {
    editModeHandler(id)
  };

  const saveTabForm = (values) => {
    console.log(values)
    editModeHandler('')
    dispatch(editTabControl({ index, key: id, values: values[id] }));
  };
  
  if(editModeHandler){
    return (
      <div>
        <Button
          startIcon={isEditable ? <SaveIcon/> : <EditIcon />}
          variant="contained"
          color="primary"
          className={style}
          onClick={isEditable ? handleSubmit(saveTabForm) : editTabForm}
        >
          {isEditable ? 'Save' : 'Edit'}
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          color="secondary"
          className={style}
          onClick={handleSubmit(addTabForm)}
        >
          Delete
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        className={style}
        onClick={handleSubmit(addTabForm)}
      >
        Add
      </Button>
      <Button
        startIcon={<DeleteSweepIcon />}
        variant="contained"
        color="secondary"
        className={style}
        onClick={handleSubmit(addTabForm)}
      >
        Clear All
      </Button>
    </div>
  );
};

export default ActionButton;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFormControl } from "../Store/Actions/forms";
import Control from "../Components/Forms/Control";
import { Grid } from "@material-ui/core";

const Form = () => {
  const menuParams = useSelector(state => state.menu.route.menuParams);
  const controls = useSelector(state => state.forms.forms);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFormControl(menuParams));
  }, [menuParams, dispatch]);

  const controlEl = controls ? controls.map(control => {
    if(control.ControlName.startsWith("lbl") || control.ControlName.startsWith("dgv")) return;
    return (
        <Control ctrlName={control.ControlName} ctrlLabel={control.ControlLabel}/>
    )
  }) : null

  return(
    <div style={{maxWidth: 1080, margin: '0 auto'}}>
      <Grid container spacing={4}>
        {controlEl}
      </Grid>
    </div>
  );
};

export default Form;

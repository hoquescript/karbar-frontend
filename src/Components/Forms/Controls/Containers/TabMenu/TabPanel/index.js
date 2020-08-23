import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useForm, FormContext } from "react-hook-form";
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Control from '../../../Control';
import GridControl from '../../GridControl';
import ActionIcon from '../ActionButton';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#eee',
    padding: '1.5rem 1rem'
  },
  tabForm:{
    backgroundColor: '#fff',
    padding: '3.5rem 2rem 2rem',
    marginRight: '1rem',
    marginBottom: '1rem'
  },
  button: {
    marginRight: '1rem',
    marginTop: '.5rem'
  }
}));

const TabPanel = (props) => {
    const classes = useStyles()
    const { value, index, controls} = props;  
    const elements = controls.filter(ctrl => ctrl.MenuParams ===  index);
    const tabControlForms = useSelector(state => state.form.values.tabControls[index]);

    // console.log(tabControlForms)
    const defaultValues = {};
    const refs = controls.map(ctrl => ctrl.ControlName);
    refs.forEach(ref => {
        defaultValues[ref] = ''
    });
    const tabControlForm = useForm({defaultValues});
  
    const [ editableForm, setEditableForm ] = useState('')
    const editModeHandler = (key) => {
      setEditableForm(key)
    }

    let gridControl = [];
    return (
      <div hidden={value !== index} className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Box className={classes.tabForm}>
              <FormContext  {...tabControlForm}>
                {value === index && elements && elements.map(el => {
                  if(el.IsGridControl) {
                    return gridControl.push(el);
                  }
                  return (
                    <Control
                      isTabControl
                      key={el.ControlName} 
                      type={el.ControlElementType}
                      name={el.ControlName}
                      label={el.ControlLabel}
                      params={el.Params}
                      disabled={editableForm}
                    />
                  )
                })}
                <ActionIcon style={classes.button} index={index}/>
              </FormContext>
            </Box>
          </Grid>
          {
            tabControlForms && tabControlForms.length > 0 && tabControlForms.map(form => (
              <Grid item xs={6} key={form.key}>
                <Box className={classes.tabForm} style={{marginRight: '1rem'}}>
                  <FormContext  {...tabControlForm}>
                    {value === index && elements && elements.map(el => {
                      // if(el.IsGridControl) {
                      //   return gridControl.push(el);
                      // }
                      return (
                        <Control
                          isTabControl
                          key={el.ControlName} 
                          type={el.ControlElementType}
                          // name={form[el.ControlName]}
                          label={el.ControlLabel}
                          params={el.Params}
                          name = {`${form.key}[${el.ControlName}]`}
                          defaultValue={form[el.ControlName]}
                          disabled={!(editableForm && editableForm === form.key)}
                        />
                      )
                    })}
                    <ActionIcon 
                      style={classes.button} 
                      index={index} 
                      id={form.key} 
                      editableForm={editableForm} 
                      editModeHandler={editModeHandler}
                    />
                  </FormContext>
                </Box>
              </Grid>
            ))
          }
          {/* </FormContext> */}
        </Grid>
        <>
          {gridControl && gridControl.length > 0 && <GridControl controls={gridControl}/>}
        </>
      </div>
    );
  }

export default TabPanel;

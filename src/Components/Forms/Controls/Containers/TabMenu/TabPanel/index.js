import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Control from '../../../Control';
import GridControl from '../../GridControl';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#eee',
    // border: '1px solid #333',
    padding: '1.5rem 1rem'
  },
  tabForm:{
    backgroundColor: '#fff',
    padding: '3.5rem 2rem 2rem',
  },
  button: {
    marginRight: '1rem',
    marginTop: '.5rem'
  }
}));

const TabPanel = (props) => {
    const classes = useStyles()
    const { value, index, controls} = props;
    const elements = controls.filter(ctrl => ctrl.MenuParams ===  index)
  
    let gridControl = [];
    return (
      <div hidden={value !== index} className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Box className={classes.tabForm} style={{marginRight: '1rem'}}>
              {value === index && elements && elements.map(el => {
                if(el.IsGridControl) {
                  return gridControl.push(el);
                }
                return <Control key={el.ControlName} control={el} isTabControl={true}/>
              })}
              <Button startIcon={<AddIcon />} variant="contained" color="primary" className={classes.button}>Add</Button>
              <Button startIcon={<DeleteSweepIcon />} variant="contained" color="secondary" className={classes.button}>Clear All</Button>
            </Box>
          </Grid>
          
          {/* <Grid item xs={6}>
            <Box className={classes.tabForm}>
              {value === index && elements && elements.map(el => {
                if(el.IsGridControl) {
                  return gridControl.push(el);
                }
                return <Control key={el.ControlName} control={el} isTabControl={true}/>
              })}
            </Box>
          </Grid> */}
        </Grid>
        <>
          {gridControl && gridControl.length > 0 && <GridControl controls={gridControl}/>}
        </>
      </div>
    );
  }

export default TabPanel;

import React from 'react';
import { useSelector } from "react-redux";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import data from './data';
import Controls from '../../index'
import ComboBox from '../../Control/ControlElement/ComboBox';
import { TextField } from '@material-ui/core';
import Control from '../../Control';
import GridControl from '../GridControl';
function TabPanel(props) {
  const { value, index, controls} = props;
  // console.log(value, index)

  const elements = controls.filter(ctrl => ctrl.MenuParams ===  index)
  // console.log(elements)

  let gridControl = [];
  return (
    <div hidden={value !== index} style={{padding: '20px'}}>
      {value === index && elements && elements.map(el => {
        if(el.IsGridControl) {
          gridControl.push(el);
          return null;
        }
        return <Control key={el.ControlName} control={el} />
      })}
      <>
        {gridControl && gridControl.length > 0 && <GridControl controls={gridControl}/>}
      </>
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabMenu({controls}) {
  const classes = useStyles();
  const tabHeader = useSelector(state => state.menu.menuPathways.tabButton);
  const tabParams = useSelector(state => state.menu.menuPathways.tabParams);
  // console.log(tabHeader)
  const [value, setValue] = React.useState(tabParams[0]);
  // console.log(controls)
  const handleChange = (event, newValue) => {
    // console.log(newValue)
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          {tabHeader.map((header, index) => {
            const control = controls.find(control => control.MenuParams === tabParams[index])
            return <Tab label={(control && control.AHead) || 'Default'} value={tabParams[index]}/>
          })}
        </Tabs>
      </AppBar>
      {tabHeader.map((header, index) => <TabPanel key={index} value={value} index={tabParams[index]} controls={controls}/>)}
    </div>
  );
}
      //  Value -> It change every time we change tab
      //  Index -> It is unique fixed value for that tab only

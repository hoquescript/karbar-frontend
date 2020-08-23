import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './TabPanel';
import { syncTabControl } from '../../../../../Store/form'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: '2rem'
  },
  appBar: {
    backgroundColor: 'rgb(114 115 123)',
    '& > div > div > span':{
      backgroundColor: '#fff'
    }
  }
}));

export default function TabMenu({ controls, tabButton }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [ tabHeader, tabParams ] = tabButton;
  const [ value, setValue ] = React.useState(tabParams[0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(syncTabControl({tabParams}))
  }, [dispatch, tabParams])

  if(tabHeader.length && tabParams.length){
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={value} onChange={handleChange}>
            {tabHeader.map((header, index) => {
              const control = controls.find(control => control.MenuParams === tabParams[index])
              return <Tab key={index} className='tabMenu' label={(control && control.AHead) || 'Default'} value={tabParams[index]}/>
            })}
          </Tabs>
        </AppBar>
        {tabHeader.map((header, index) => <TabPanel key={index} value={value} index={tabParams[index]} controls={controls}/>)}
      </div>
    );
  }
  return null;
}
      //  Value -> It change every time we change tab
      //  Index -> It is unique fixed value for that tab only

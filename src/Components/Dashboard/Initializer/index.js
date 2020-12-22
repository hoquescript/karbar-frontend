import React from "react";
import { useSelector } from 'react-redux';
import { Grid, Breadcrumbs, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Clock from './Clock';
import IconGenarator from "../../Util/IconGenarator/IconGenarator"


const useStyles = makeStyles(theme => ({
  root : {
    padding: '15px 0',
    width:'100%',
    backgroundColor: theme.palette.background.default
  },
  breadcrumb: {
    fontSize: 13,
    // fontWeight: 400,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey[1000]}`,
    borderRadius: '8px 25% 25% 8px',
    padding: '2px 10px',
    width: '65%',
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.4rem',
    color: '#00118e'
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.4rem',
    color: theme.palette.primary.main,
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: '2.5rem',
    height: '2.5rem',
    color: '#201e64'
  },
  iconAnt: {
    marginRight: theme.spacing(1),
    fontSize: 22,
    color: '#201e64'
  },
  seperator: {
    width: '1rem',
    height: '1rem',
    margin: '0rem .5rem'
  },
  greeting: {
    fontSize: '3.5rem',
    fontFamily: "'Montserrat', sans-serif !important",
    fontWeight: 500,
    color: '#1c2c69'
  },
  name: {
    fontWeight: 300,
    marginLeft: 7
  }
}));

const Initializer = () => {
  const classes = useStyles();

  const menuName = useSelector(state => state.menu.selectedMenu.AHead);
  const icon = useSelector(state => state.menu.selectedMenu.IconName);

  return (
    <Grid container style={{ marginBottom: "2rem" }} spacing={5}>
      <Grid container item alignItems="center" xs={6}>
        <h1 className={classes.greeting}>
          Welcome, 
          <span className={classes.name}>Wahid</span>
        </h1>
        <Breadcrumbs separator={<FiberManualRecordIcon className={classes.seperator}/>} className={classes.breadcrumb}>
          <Typography className={classes.link}>
            <span className={classes.icon}><HomeIcon/></span>
            <span>Home</span>
          </Typography>
          <Typography className={classes.link}>
            <span className={classes.icon}><DashboardIcon/></span>
            <span>Dashboard</span>
          </Typography>
          <Typography className={`${classes.link}`}>
            <span className={classes.iconAnt}>{IconGenarator(icon)}</span>
            <span>{menuName || 'Accounts Management' }</span>
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid container item direction="row" justify="flex-end" xs={6}>
        <Clock />
      </Grid>
    </Grid>
  );
};

export default Initializer;

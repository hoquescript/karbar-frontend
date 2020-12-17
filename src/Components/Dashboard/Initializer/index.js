import React from "react";
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
      fontWeight: 400,
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.grey[1000]}`,
      padding: '5px 10px',
  },
  link: {
      display: 'flex',
      fontSize: '1.4rem',
      color: theme.palette.primary.dark
  },
  main: {
      color: theme.palette.primary.main,
  },
  icon: {
      marginRight: theme.spacing(0.5),
      width: '2rem',
      height: '2rem',
  },
}));

const Initializer = () => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginBottom: "2rem" }} spacing={5}>
      <Grid item xs={6}>
        <h1>Dashboard</h1>
        <Breadcrumbs separator={<FiberManualRecordIcon/>} className={classes.breadcrumb}>
          <Typography className={classes.link}>
            <span className={classes.icon}><HomeIcon/></span>
            Home
          </Typography>
          <Typography className={classes.link}>
            <span className={classes.icon}><DashboardIcon/></span>
            Dashboard
          </Typography>
          <Typography className={`${classes.link} ${classes.main}`}>
            {/* <span className={classes.icon}>{IconGenarator(icon)}</span>
            {tertiary || '...' } */}
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid container item direction="row" xs={6}>
        <Clock />
      </Grid>
    </Grid>
  );
};

export default Initializer;

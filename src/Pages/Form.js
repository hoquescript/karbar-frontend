import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdPlaylistAdd } from 'react-icons/md';
import { fetchFormControl } from "../Store/Actions/forms";
import { makeStyles } from '@material-ui/core/styles';
import Control from "../Components/Forms/Control";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "antd";

const useStyles = makeStyles(theme => ({
  actionWrapper : {
      backgroundColor: '#fff',
  },
  bookmarkWrapper: {
      display: 'flex',
      height: '100%',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      fontFamily: "'Open Sans', sans-serif",
      transition: 'background-color 0.5s',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#e1e1e1',
      },
  },
  bookmarkIcon: {
    marginRight: theme.spacing(1.5),
    fontSize: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#0f236f'
  },
  controlWrapper: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: '40px 100px',
    position: 'relative',
    '&::before': {
      content: "''",
      width: 0,
      height: 0,
      borderTop: '15px solid #0f236f',
      borderRight: '15px solid transparent',
      position: 'absolute',
      left: 0,
      top: 0,
    }
  },
  // arrow: {
  //   height: 10
  // },
}));

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
        <Control {...control} key={control.ControlName} style={{marginBottom: 10}}/>
    )
  }) : null
  const menuButton = controls.length > 0 ? controls[0].MenuButton.split("~") :  null
  console.log(menuButton)

  const classes = useStyles();

  return(
    <>
      <Grid container justify="space-between" alignItems="center" className={classes.actionWrapper}>
        <Grid item className={classes.bookmarkWrapper}>
          <MdPlaylistAdd className={classes.bookmarkIcon}/>
          <Typography variant="subtitle1">Add Bookmark</Typography>
        </Grid>
        <Grid item style={{padding: 20}}>
          <Button>Create</Button>
          <Button>Post</Button>
          <Button>Add</Button>
          <Button>Delete</Button>
        </Grid>
      </Grid>
      <Grid container className={classes.controlWrapper}>
        <span className={classes.arrow}></span>
        {controlEl}
      </Grid>
    </>
  );
};

export default Form;

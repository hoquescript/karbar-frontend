import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import ActionButton from "./ActionButton";
import AddBookmark from "./AddBookmark";

const useStyles = makeStyles(theme => ({
    actionWrapper : {
        backgroundColor: theme.palette.background.default,
        margin: "20px auto",
        width: "120rem"
    },
    actionButton:{
      display: 'flex',
      alignItems: 'center',
      marginRight:'2rem'
    },
    bookmarkWrapper: {
        display: 'flex',
        color: theme.palette.typography.main,
        alignItems: 'center',
        height: '100%',
        padding: '1.8rem',
        backgroundColor: theme.palette.grey[100],
        fontFamily: "'Open Sans', sans-serif",
        transition: 'background-color 0.5s',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: `${theme.palette.grey[150]} !important`,
        },
    },
    bookmarkIcon: {
      marginRight: theme.spacing(1.5),
      fontSize: '3rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.main
    },
}));
  
const ActionBar = ({ menuButton, gridSQL }) => {
    const classes = useStyles();
    return (
        <Grid container justify="space-between" className={classes.actionWrapper}>
            <Grid item className={classes.bookmarkWrapper}>
                <AddBookmark styles={classes.bookmarkIcon}/>
            </Grid>
            <Grid item className={classes.actionButton}>
                <ActionButton menuButton={menuButton} gridSQL={gridSQL}/>
            </Grid>
        </Grid>
    )
}

export default ActionBar

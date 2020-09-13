import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( theme => ({
  card:{
    padding: '1.5rem',
    border: '1px solid  rgba(0,0,0,0.14)',
    marginBottom: 15,
    transition: 'box-shadow 0.3s cubic-bezier(.25,.8,.25,1)',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.22)'
    }
  },
  mainHeading:{
    fontSize: 22,
    marginBottom: 7,
  },
  subHeading: {
    fontSize: 15,
    marginBottom: 7
  },
  timespan: {
    fontSize: 11,
    marginBottom: 10,
    fontWeight: 600
  },
  time: {
    '&::after': {
      display: 'inline-block',
      margin: '2px 5px',
      content: '""', 
      height: 5,
      width: 5, 
      borderRadius: '50%',
      backgroundColor: '#333'
    } 
  },
  btnWrapper:{
    // margin: 10,
    display: 'flex'
  },
  button:{
    "backgroundColor": "#324ab1",
    "fontFamily": "'Montserrat', sans-serif",
    "color": "white",
    "padding": "10px",
    "width": "100%"
  }
}));


const ActionCard = () => {
  const classes = useStyles();

  return (
      <div className={classes.card}>
        <h1 className={classes.mainHeading}>Join Request</h1>
        <p className={classes.subHeading}>
          <strong>Wahid Hoque</strong> from the HR Department wants to join as moderator. Please take actions.
        </p>
        <h3 className={classes.timespan}>
          <span className={classes.time}>10:55 AM</span>
          <span>9/13/20</span>
        </h3>
        <div className={classes.btnWrapper}>
          <button className={classes.button} style={{marginRight: 5}}>Accept</button>
          <button className={classes.button}>Reject</button>
        </div>
      </div>
)
}

export default ActionCard

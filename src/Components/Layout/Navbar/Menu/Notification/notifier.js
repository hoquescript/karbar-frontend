import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( theme => ({
  card:{
    padding: '1.5rem',
    border: '1px solid  rgba(0,0,0,0.14)',
    marginBottom: 15,
    // boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',  
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
    marginBottom: 10,
    fontWeight: 500
  },
  timespan: {
    fontSize: 11,
    // marginBottom: 10,
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


const Notifier = () => {
  const classes = useStyles();

  return (
      <div className={classes.card}>
        {/* <h1 className={classes.mainHeading}>Join Request</h1> */}
        <p className={classes.subHeading}>
          Accounts Management section is upgraded now. Please clean the cache to check the latest updates
        </p>
        <h3 className={classes.timespan}>
          <span className={classes.time}>06:14 PM</span>
          <span>20/10/20</span>
        </h3>
        {/* <div className={classes.btnWrapper}>
          <button className={classes.button} style={{marginRight: 5}}>Accept</button>
          <button className={classes.button}>Reject</button>
        </div> */}
      </div>
)
}

export default Notifier

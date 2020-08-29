import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0px 5px 5px -3px rgba(82,63,104,0.06),0px 8px 10px 1px rgba(82,63,104,0.042),0px 3px 14px 2px rgba(82,63,104,0.036)',
    overflow: 'hidden'
  },
}));


const Card = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      {props.children}
    </div>
  )
}

export default Card

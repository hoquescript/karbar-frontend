import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { Card, Button, TextField, Switch } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    width: '60rem',
    padding: '5rem',
    textAlign: 'center'
  },
  form: {
    '& > *': {
      display: 'block',
      width: '100%', 
      marginBottom: '2.5rem'
    }
  },
  btn: {
    margin: '4rem auto 1rem',
    padding: '1.5rem 4rem',
    fontSize: '1.6rem'
  },
  switchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '3rem 0 0'
  }
});

const Login = () => {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const onSubmit = data => console.log(data)

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.container}>
    <Card className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <TextField label="Client Code" fullWidth variant="outlined" />
        <TextField label="Module Code" fullWidth variant="outlined" />
        <TextField label="User Name" fullWidth variant="outlined" />
        <TextField label="Password" fullWidth variant="outlined" />
      </form>
      <div className={classes.switchContainer}>
        <span>Remember Me</span>
        <Switch
          checked={state.checkedA}
          onChange={handleChange}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>
      <Button variant="contained" color="secondary" className={classes.btn}>
        Login
      </Button>
    </Card>
    </div>
  );
}


export default Login;
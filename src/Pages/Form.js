import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initiateFetchFormControl } from "../Store/Actions/forms";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from "@material-ui/core";

import { useForm, FormContext } from 'react-hook-form';

import Loading from '../Components/Util/Loading/Loading'
import FormHeader from '../Components/Forms/FormHeader';
import ActionBar from "../Components/Forms/ActionBar";
import Controls from "../Components/Forms/Controls";
import GridView from "../Components/Forms/Controls/Containers/GridView";

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    position: 'relative',
    minHeight: '35rem',
    width: '120rem',
    padding: '4rem 2rem 3rem 2rem',
    backgroundColor: theme.palette.background.default,
    '&::before': {
      content: "''",
      width: 0,
      height: 0,
      borderTop: `1.5rem solid ${theme.palette.primary.main}`,
      borderRight: '1.5rem solid transparent',
      position: 'absolute',
      left: 0,
      top: 0,
    }
  },
}));

const Form = () => {
  const classes = useStyles();
  const hookFormMethods = useForm();

  const menuParams = useSelector(state => state.menu.selectedMenu.MenuParams);
  const tabParams = ["BRCareer", "BRExp"]

  const isLoading = useSelector(state => state.forms.isFormLoading);
  const controls = useSelector(state => state.forms.forms);
  const isGridView = useSelector(state => state.forms.gridData.isGridView);
  const menuButton = controls && controls.length > 0 && controls[0].MenuButton && controls[0].MenuButton.split(  "~");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initiateFetchFormControl(menuParams, tabParams));
  }, [menuParams, dispatch]);

  return(
    <>
      <FormHeader/>
      <Box style={{margin: '0 auto'}}>
        <FormContext {...hookFormMethods}> 
          <ActionBar menuButton={menuButton} gridSQL={""}/>
          {/* <MuiAlert elevation={6} variant="filled" severity="success">This is a success message!</MuiAlert> */}
          <Grid item container className={classes.contentWrapper} style={{marginBottom: isGridView ? 20 : 40}}>
            { isLoading ? <Loading/> : <Controls controls={controls} menuParams={menuParams}/> }
          </Grid>
          {isGridView && (
            <Grid item className={classes.contentWrapper} style={{marginBottom: 40}}>
              <GridView/>
            </Grid>
          )}
        </FormContext>
        {/* <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <MuiAlert elevation={6} variant="filled" severity="success">
            This is a success message!
          </MuiAlert>
        </Snackbar> */}
      </Box>
    </>
  );
};

export default Form;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchControl } from "../Store/form";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from "@material-ui/core";

import { useForm, FormContext } from 'react-hook-form';

import { tabMenuFormatter } from '../Constants/StringHelper'
import Loading from '../Components/Util/Loading/Loading'
import FormHeader from '../Components/Forms/FormHeader';
import ActionBar from "../Components/Forms/ActionBar";
import Controls from "../Components/Forms/Controls";
import GridView from "../Components/Forms/Controls/Containers/GridView";
import { hasNoPersistance } from "../Constants/misc";

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
  const tabButton = useSelector(state => state.menu.selectedMenu.TabButton);
  const [ tabHeader, tabParams ] = tabMenuFormatter(tabButton)

  const isLoading = useSelector(state => state.form.isFormLoading);
  const isGridView = false;

  const controls = useSelector(state => state.form.controls);


  const dispatch = useDispatch();
  useEffect(() => {
    if(controls.length === 0 || menuParams !== controls[0].MenuParams){
      dispatch(fetchControl({menuParams, tabParams}));
    }
  }, [menuParams, dispatch]);


  const menuButton = controls && controls.length > 0 && controls[0].MenuButton && controls[0].MenuButton.split("~");
  return(
    <>
      <FormHeader/>
      <Box style={{margin: '0 auto'}}>
        <FormContext {...hookFormMethods}> 
          <ActionBar menuButton={menuButton} gridSQL={""}/>
          {/* <MuiAlert elevation={6} variant="filled" severity="success">This is a success message!</MuiAlert> */}
          <Grid item container className={classes.contentWrapper} style={{margin: '0 auto', marginBottom: isGridView ? 20 : 40}}>
            { isLoading ? <Loading/> : <Controls controls={controls} menuParams={menuParams} tabButton={[tabHeader, tabParams]}/> }
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

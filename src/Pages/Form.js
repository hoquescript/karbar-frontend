import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initiateFetchFormControl } from "../Store/Actions/forms";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Snackbar } from "@material-ui/core";
// import MuiAlert from '@material-ui/lab/Alert';
import { useForm, FormContext } from 'react-hook-form';
import Loading from '../Components/Util/Loading/Loading'
import FormHeader from '../Components/Forms/FormHeader/FormHeader';
import Control from "../Components/Forms/Control";
import GridControl from "../Components/Forms/GridControl/GridControl";
import GridView from "../Components/Forms/GridView";
import ActionBar from "../Components/Forms/ActionBar/ActionBar";
import Tree from "../Components/Util/ControlElement/Tree"
import { genarateSQL } from "../Constants/StringHelper";
import EditControl from "../Components/Forms/EditControl/EditControl";

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

  const menuParams = useSelector(state => state.menu.route.menuParams);
  const isLoading = useSelector(state => state.forms.isFormLoading);
  const controls = useSelector(state => state.forms.forms);
  const isGridView = useSelector(state => state.forms.gridData.isGridView);
  const menuButton = controls && controls.length > 0 && controls[0].MenuButton && controls[0].MenuButton.split(  "~");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initiateFetchFormControl(menuParams));
  }, [menuParams, dispatch]);


  let treeChild, editGridData, gridSQL;
  let gridControlChild = [];
  const controlEl = controls && controls.map(ctrl => {
    ctrl.ControlName = ctrl.ControlName.trim()
    if(ctrl.IsGridControl) {
      gridControlChild.push(ctrl);
      return null;
    }
    if(ctrl.ControlName.startsWith("lbl"))return null;
    if(ctrl.ControlName.startsWith("Tre")) {
      treeChild = ctrl.Params;
      return null;
    }
    if(ctrl.ControlElementType.trim() === ("egv")) {
      editGridData = ctrl.Params;
      return null;
    }
    if(ctrl.ControlName.startsWith("dgv")) {
      gridSQL = genarateSQL(ctrl)
      return null;
    }
    return (
        <Control key={ctrl.ControlName} control={ctrl} />
    )
  })
  return(
    <>
      <FormHeader/>
      <Box style={{margin: '0 auto'}}>
        <FormContext {...hookFormMethods}> 
          <ActionBar menuButton={menuButton} gridSQL={gridSQL}/>
          {/* <MuiAlert elevation={6} variant="filled" severity="success">This is a success message!</MuiAlert> */}
          <Grid item container className={classes.contentWrapper} style={{marginBottom: isGridView ? 20 : 40}}>
            {
              isLoading ? 
                <Loading/> : (
                <>
                  <Grid item container>
                    {treeChild && (
                        <Grid item xs={3} container alignItems="center" style={{transform: 'translateY(-20px)'}}>
                          <Tree params={treeChild}/>
                        </Grid>
                    )}
                    <Grid item container justify="center" alignItems="center" xs={treeChild ?  9 : 12}>
                      {controlEl}
                    </Grid>
                  </Grid>
                  {gridControlChild.length > 0 && (
                    <GridControl controls={gridControlChild}/>
                  )}
                  {editGridData && editGridData.length > 0 && (
                    <EditControl data={editGridData}/>
                  )}
                </>
              )
            }
          </Grid>
          {
            isGridView && (
                <Grid item className={classes.contentWrapper} style={{marginBottom: 40}}>
                  <GridView/>
                </Grid>
            )
          }
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

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initiateFetchFormControl } from "../Store/Actions/forms";
import { AppstoreAddOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from "@material-ui/core";
import { useForm, FormContext } from 'react-hook-form';
import Loading from '../Components/Util/Loading/Loading'
import Headbar from '../Components/Forms/Headbar';
import Control from "../Components/Forms/Control";
import GridControl from "../Components/Forms/GridControl/GridControl";
import GridView from "../Components/Forms/GridView";
import ActionButton from "../Components/Forms/ActionButton";
import Tree from "../Components/Util/ControlElement/Tree"
import { genarateSQL } from "../Constants/StringHelper";

const useStyles = makeStyles(theme => ({
  actionWrapper : {
      backgroundColor: '#fff',
      height: 80,
      margin: "20px 0",
  },
  bookmarkWrapper: {
      display: 'flex',
      alignItems: 'center',
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
  contentWrapper: {
    position: 'relative',
    minHeight: 350,
    width: 1200,
    backgroundColor: '#fff',
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
}));

const Form = () => {
  const classes = useStyles();
  const hookFormMethods = useForm();

  const menuParams = useSelector(state => state.menu.route.menuParams);
  const isLoading = useSelector(state => state.forms.isFormLoading);
  const controls = useSelector(state => state.forms.forms);
  const isGridView = useSelector(state => state.forms.gridData.isGridView);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initiateFetchFormControl(menuParams));
  }, [menuParams, dispatch]);


  let treeChild, gridSQL;
  let gridControlChild = [];
  const controlEl = controls && controls.map(ctrl => {
    if(ctrl.IsGridControl) {
      gridControlChild.push(ctrl);
      return null;
    }
    if(ctrl.ControlName.startsWith("lbl"))return null;
    if(ctrl.ControlName.startsWith("Tre")) {
      treeChild = ctrl.Params;
      return null;
    }
    if(ctrl.ControlName.startsWith("dgv")) {
      gridSQL = genarateSQL(ctrl)
      return null;
    }
    return (
        <Control key={ctrl.ControlName} {...ctrl} />
    )
  })

  return(
    <>
      <Headbar/>
      <Box style={{margin: '0 auto'}}>
        <FormContext {...hookFormMethods}> 
          <Grid container justify="space-between" className={classes.actionWrapper}>
            <Grid item className={classes.bookmarkWrapper}>
              <AppstoreAddOutlined className={classes.bookmarkIcon}/>
              <Typography variant="subtitle1">Add Bookmark</Typography>
            </Grid>
            <Grid item style={{padding: 20}}>
              <ActionButton controls={controls} gridSQL={gridSQL}/>
            </Grid>
          </Grid>
          <Grid item container className={classes.contentWrapper} style={{padding: 20,marginBottom: isGridView ? 20 : 40}}>
            {
              isLoading ? 
                <Loading/> : (
                <>
                  <Grid item container style={{padding: 40, width:'100%'}}>
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
      </Box>
    </>
  );
};

export default Form;

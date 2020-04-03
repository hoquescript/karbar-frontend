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
      backgroundColor: theme.palette.background.default,
      margin: "20px 0",
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
              <Typography variant="subtitle1" style={{color: 'inherit'}}>Add Bookmark</Typography>
            </Grid>
            <Grid item className={classes.actionButton}>
              <ActionButton controls={controls} gridSQL={gridSQL}/>
            </Grid>
          </Grid>
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

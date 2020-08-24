import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import Control from "./Control";
import Tree from "../Controls/Control/ControlElement/Tree"
import GridControl from "./Containers/GridControl";
import EditControl from "./Containers/EditControl";
import TabMenu from "./Containers/TabMenu";

// import { genarateSQL } from "../Constants/StringHelper";

const Controls = ({ controls, menuParams, tabButton }) => {
    
    const gridControlsValue = useSelector(state => state.form.values.gridControls)

    let treeChild, editGridData, gridSQL ;
    let gridControlChild = [], tabData= [];
  
    const controlEl = controls && controls.map(ctrl => {
        // ctrl.ControlName = ctrl.ControlName.trim()
        if(ctrl.MenuParams !== menuParams){
          tabData.push(ctrl)
          return null;
        }
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
          // gridSQL = genarateSQL(ctrl)
          return null;
        }
        return (
            <Control 
              key={ctrl.ControlName}
              type={ctrl.ControlElementType}
              name={ctrl.ControlName}
              label={ctrl.ControlLabel}
              params={ctrl.Params}
              // disabled={}
              // defaultValue ={}
            />
        )
      })
    
    return (
      <>
        <Grid item container>
          {/* {treeChild && (
              <Grid item xs={3} container alignItems="center" style={{transform: 'translateY(-20px)'}}>
                <Tree params={treeChild}/>
              </Grid>
          )} */}
          <Grid item container justify="center" alignItems="center" xs={treeChild ?  9 : 12}>
            {controlEl}
          </Grid>
        </Grid>
        {gridControlChild && gridControlChild.length > 0 && (
          <GridControl tabIndex='' controls={gridControlChild} gridValue={gridControlsValue}/>
        )}
        {editGridData && editGridData.length > 0 && (
          <EditControl data={editGridData}/>
        )}
        {tabData && tabData.length > 0 && (
          <TabMenu controls={tabData} tabButton={tabButton}/>
        )}
      </>
)
}

export default Controls

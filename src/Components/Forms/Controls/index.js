import React from "react";
import { Grid } from "@material-ui/core";
import Control from "./Control";
import Tree from "../Controls/Control/ControlElement/Tree"
import GridControl from "./Containers/GridControl";
import EditControl from "./Containers/EditControl";

// import { genarateSQL } from "../Constants/StringHelper";

const Controls = ({ controls }) => {
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
          // gridSQL = genarateSQL(ctrl)
          return null;
        }
        return (
            <Control key={ctrl.ControlName} control={ctrl} />
        )
      })
    
    return (
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

export default Controls

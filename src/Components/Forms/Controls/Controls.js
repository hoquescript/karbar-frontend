import React from 'react'

const Controls = () => {
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

import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Summary from './Summary'

const Summaries = () => {
  return (
    <Grid container justify="space-between" spacing={5}>
      <Summary/>
      <Summary/>
      <Summary/>
      <Summary/>      
      {/* <Summary/>
      <Summary/>       */}
    </Grid>
  )
}

export default Summaries

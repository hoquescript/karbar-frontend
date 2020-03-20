import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.8),
    border: '1px solid #c1c1c1',
    borderRadius: 4,
    minHeight: 55
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const ChipField = () => {
  const classes = useStyles();
  const chipData = useSelector(state => state.forms.chipData);
  return (
    <div className={classes.root}>
      {chipData.map(data => {
        return (
          <Chip
            key={data.key}
            label={data.label}
            className={classes.chip}
          />
        );
      })}
    </div>
  );
}

export default ChipField;
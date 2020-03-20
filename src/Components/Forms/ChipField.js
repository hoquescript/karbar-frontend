import React from 'react';
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

const ChipField = ({chipData}) => {
  const classes = useStyles();
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
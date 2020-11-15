import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '../../../../Store/interface'

import { Avatar, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Switch } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import avatar from '../../../../Assets/pic.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    display: 'flex'
  },
  avatar: {
    '&:focus': {
        outline: 'red solid 1px'
    },
    '&:hover': {
        // padding: 5,
        // border: '2px solid red',
        outline: '#4CAF50 solid 1px'
    }
  }
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const darkMode = useSelector((state) => state.ui.darkMode);  
  const handleDarkModeChange = (e) => {
    dispatch(setDarkMode({ darkMode: e.target.checked }))
  }

  return (
    <div className={classes.root}>
      <div>
        <span>
            <Avatar alt="User" src={avatar} ref={anchorRef} onClick={handleToggle}  className={classes.avatar}/>
        </span>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem>
                      Dark Theme
                      <Switch checked={darkMode} onChange={handleDarkModeChange}/>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      {/* <h2>Wahid</h2> */}
    </div>
  );
}

export default Profile;
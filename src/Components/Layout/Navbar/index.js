import React from "react";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import lightLogo from "../../../Assets/logo-color.png";
import darkLogo from "../../../Assets/logo-white.png";

import Profile from "./Menu/Profile";
import Bookmarks from "./Menu/Bookmarks";
import Settings from "./Menu/Settings";
import Notification from "./Menu/Notification";
import Searchbar from "./Searchbar";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: 'flex',
    backgroundColor: theme.palette.header.background,
    height: "7.5rem",
    // width: "calc(100% - 8rem)",
    // position: "absolute",
    // zIndex: 100000000000,
    // left: "28rem"
    borderBottom: `1px solid ${theme.palette.grey[1000]}`

  },
  menuCollapse: {
    backgroundColor: theme.palette.drawer.main.background,
    transition: "all 0.2s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "7.5rem",
    maxWidth: "8rem",
  },
  collapseIcon: {
    fontSize: '2.5rem',
    color: '#fff'
    // color: theme.palette.header.icon
  },
  menubar: {
    width: '100%',
    // display: 'flex',
    // justifyContent:'flex-end',
    // alignItems: 'center',
    margin: "0 7rem",
  },
  iconWrapper:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: '6rem'
  },
  icon: {
    fontSize: '2.3rem',
    color: theme.palette.header.icon,
    marginRight: '.5rem'
  }
}));


const Navbar = ({mode, collapse, collapseHandler, isSideDrawerActive}) => {
  const classes = useStyles();
  const styles = (offside) => ({
    transform: isSideDrawerActive ? `translateX(${offside}rem)`:'',
    transition: "transform 0.3s",
  })
  return (
    <Box className={classes.navbar}>
      <Box
        className={classes.menuCollapse}
        onClick={collapseHandler} 
        style={collapse ? {minWidth: 80} : {minWidth: 280}}
      >
        {collapse ? <MenuUnfoldOutlined className={classes.collapseIcon}/> : <MenuFoldOutlined className={classes.collapseIcon}/>}
      </Box>

      <Grid container justify="space-between" alignItems="center" className={classes.menubar}>
        <Grid item>
          <img style={{height: '4rem', ...styles(3)}} src={mode ? darkLogo : lightLogo} alt="Logo of Dot Bangladesh" />
        </Grid>
        {/* <Grid item>
          <Searchbar style={{...styles(8)}}/>
        </Grid> */}
        <Grid item className={classes.iconWrapper}>
          <Bookmarks style={classes.icon}/>
          <Notification style={classes.icon}/>
          <Settings style={classes.icon}/>
          <Profile/>
        </Grid>

      </Grid>
      
    </Box>
  );
};

export default Navbar;

import React from "react";
import { Grid, Box } from "@material-ui/core";
import logo from "../../Assets/logo-color.png";
// import logo from "../../Assets/logo-white.png";
import Profile from "./HeaderMenu/Profile";
import Notification from "./HeaderMenu/Notifcation";
import Settings from "./HeaderMenu/Settings";
import { makeStyles } from '@material-ui/core/styles';
import Bookmarks from "./HeaderMenu/Bookmarks";
import Searchbar from "./Searchbar/Searchbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.header.background,
    height: "7.5rem",
    width: "calc(100% - 8rem)",
    position: "absolute",
    zIndex: 100000000000,
    left: "8rem"
  },
  menuCollapse: {
    backgroundColor: theme.palette.header.collapseBackground,
    transition: 'all 0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent:'space-around',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.grey[1000]}`
  },
  iconWrapper:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: '2.5rem',
    color: theme.palette.header.icon,
    marginRight: '.5rem'
  }
}));


const HeaderMenu = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Box className={classes.menuWrapper}>

        <img style={{height: '4rem'}} src={logo} alt="Logo of Dot Bangladesh" />

        <Searchbar/>

        <Box className={classes.iconWrapper}>
          <Bookmarks style={classes.icon}/>
          <Notification style={classes.icon}/>
          <Settings style={classes.icon}/>
          <Profile/>
        </Box>

      </Box>
      
    </Grid>
  );
};

export default HeaderMenu;

import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Grid, Box } from "@material-ui/core";

import MainDrawer from "./MainDrawer";
import SideDrawer from "./SideDrawer";


const useStyles = makeStyles((theme) => ({
  menuCollapse: {
    backgroundColor: theme.palette.drawer.main.background,
    transition: "all 0.2s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "7.5rem",
    maxWidth: "8rem",
  },
  menuCollapseLogo: {
    fontSize: '2.5rem',
    color: '#fff'
    // color: theme.palette.header.icon
  },
  "@global": {
    //Selected MainDrawer's Head Menu Style
    ".ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected": {
        backgroundColor: `${theme.palette.drawer.main.selectedBackground} !important`,
    },
    //Selected SideDrawer's Head Menu Style
    ".ant-menu-submenu-selected": {
        color: theme.palette.drawer.side.selectedHeadText,
    },
    //Selected SideDrawer's  menu Background Style
    ".ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected": {
        background: theme.palette.drawer.side.selectedMenuBackground,
    },
    //Selected SideDrawer's menu Font Color Style
    ".ant-menu-item-selected > a, .ant-menu-item-selected > a:hover": {
        color: `${theme.palette.drawer.side.selectedMenuText} !important`,
    },
  },
}));


const AppDrawer = () => {
  const classes = useStyles();
  const [key, setKey] = useState("home");

  const [collapse, setCollapse] = useState(true);
  const [isSideDrawerActive, setSideDrawerActive] = useState(false);
  const modulesMenuCollapseHandler = () => {
      setCollapse(!collapse);
      setSideDrawerActive(false);
  };

  const mainDrawerHandler = (item, val) => {
      // if the Main Drawer is expanded, Then Collapsing the main Drawer, And will make the sideDrawer active
      setCollapse(true);

      //Toggling SideDrawer
      if (key === item.key && isSideDrawerActive) {
          setSideDrawerActive(false);
      } else if (key === item.key && !isSideDrawerActive) {
          setSideDrawerActive(true);
      } else {
          setSideDrawerActive(true);
      }
      //Setting the Current Selected Module
      setKey(item.key);
  };
  
  return (
  <div style={{display: 'flex', flexDirection:'column'}}>
      <Box
        className={classes.menuCollapse}
        onClick={modulesMenuCollapseHandler} 
        style={collapse ? {minWidth: 80} : {minWidth: 220}}
      >
        {collapse ? <MenuUnfoldOutlined className={classes.menuCollapseLogo}/> : <MenuFoldOutlined className={classes.menuCollapseLogo}/>}
      </Box>
      <div style={{display: 'flex', flexDirection:'row'}}>
        <MainDrawer collapse={collapse} mainDrawerHandler={mainDrawerHandler}/>
        <SideDrawer primaryModule={key} collapsed={isSideDrawerActive}/>
      </div>
  </div>
)
}

export default AppDrawer

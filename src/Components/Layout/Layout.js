import React, { useState, useEffect, } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles";
import { Layout, Menu } from "antd";
import { HomeOutlined, PicCenterOutlined, ApartmentOutlined} from '@ant-design/icons'

import Header from "./Header";
import SideDrawer from "./SideDrawer";
import { fetchModulesMenu } from "../../Store/Actions/menu"
import IconGenarator from "../Util/IconGenarator/IconGenarator";

const { Sider } = Layout;

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100vh',
    height: '100vh'
  },
  mainDrawer: {
    backgroundColor: theme.palette.drawer.main.background
  },
  body: {
    backgroundColor: theme.palette.background.paper,
  },
  '@global': {
    //Selected MainDrawer's Head Menu Style
    '.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected':{
      backgroundColor: `${theme.palette.drawer.main.selectedBackground} !important`,
    },
    //Selected SideDrawer's Head Menu Style
    '.ant-menu-submenu-selected':{
      color: theme.palette.drawer.side.selectedHeadText
    },
    //Selected SideDrawer's  menu Background Style
    '.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected': {
      background: theme.palette.drawer.side.selectedMenuBackground,
    },
    //Selected SideDrawer's menu Font Color Style
    '.ant-menu-item-selected > a, .ant-menu-item-selected > a:hover':{
      color: `${theme.palette.drawer.side.selectedMenuText} !important`
    },

  }
}));

const LayoutModel = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const modulesMenu = useSelector ( state => state.menu.modulesMenu )
  
  const [key, setKey] = useState(1);
  const [isBasic,setIsBasic] = useState(false)
  const [isMaster,setIsMaster] = useState(false)
  const [collapse, setCollapse] = useState(true)
  const [subMenuCollapse, setSubMenuCollapse] = useState(false);

  const [subMenuData, setSubMenuData] = useState(null);
  const modulesMenuCollapseHandler = () => {
    setCollapse(!collapse)
    setSubMenuCollapse(false)
  }

  const subMenuHandler = (item, val) => {
    setCollapse(true)

    if(parseInt(item.key) === 1){
      setSubMenuCollapse(false);
      setKey(1);
      return;
    }
    if (key === item.key && subMenuCollapse) {
      setSubMenuCollapse(false);
    } else if (key === item.key && !subMenuCollapse) {
      setSubMenuCollapse(true);
    } else {
      setSubMenuCollapse(true);
    }
    setKey(item.key);

    if(parseInt(item.key) === 2){
      setIsBasic(true);
      setIsMaster(false);
      return;
    }

    if(parseInt(item.key) === 3){
      setIsBasic(false)
      setIsMaster(true);
      return;
    }

    //Deriving Single Detailed Object of the clicked Module Menu
    if (modulesMenu.length > 0) {
      const module = modulesMenu.find(menu => menu.ACode === item.key)
      setIsBasic(false)
      setIsMaster(false);
      setSubMenuData(module);
    }
  };
  useEffect(() => {
    dispatch(fetchModulesMenu());
  },[dispatch]);

  return (
    <Layout className={classes.root}>
      <Header collapse={collapse} collapseMenu={modulesMenuCollapseHandler}/>
      <Layout>
        <Sider className={classes.mainDrawer} collapsed={collapse} width={220}>
          <Menu className={classes.mainDrawer} theme="dark" defaultSelectedKeys={["1"]} mode="inline" onClick={subMenuHandler} >
            <Menu.Item key="1">
              <NavLink to="/">
                <HomeOutlined />
                <span>Home</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <PicCenterOutlined />
              <span>Basic Data</span>
            </Menu.Item>
            <Menu.Item key="3">
              <ApartmentOutlined />
              <span>Master Data</span>
            </Menu.Item>
            <div style={{ margin: "20px 10px", height: 2, background: "#fff" }}></div>
            {modulesMenu.map(menu => (
              <Menu.Item key={menu.ACode}>
                {IconGenarator(menu.IconName)}
                <span>{menu.AHead}</span>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <SideDrawer data={subMenuData} collapsed={subMenuCollapse} isBasic={isBasic} isMaster={isMaster}/>
        <Layout className={classes.body}>
          {props.children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutModel;

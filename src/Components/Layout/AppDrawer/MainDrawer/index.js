import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Layout, Menu } from "antd";

import {
    HomeOutlined,
    PicCenterOutlined,
    ApartmentOutlined,
} from "@ant-design/icons";

import IconGenarator from "../../../Util/IconGenarator/IconGenarator";
const { Sider } = Layout;

const useStyles = makeStyles((theme) => ({
    mainDrawer: {
        backgroundColor: theme.palette.drawer.main.background,
        height: "calc(100vh - 7.5rem)",
    },  
}));

const MainDrawer = ({ collapse, mainDrawerHandler }) => {
    const classes = useStyles();
    const moduleMenu = useSelector((state) => state.menu.allMenu.module);  

    return (
        <Sider className={classes.mainDrawer} collapsed={collapse} width={280}>
            <Menu className={classes.mainDrawer} theme="dark" defaultSelectedKeys={["home"]} mode="inline" onClick={mainDrawerHandler} >
                <Menu.Item key="home">
                    {/* <NavLink to="/"> */}
                        <HomeOutlined />
                        <span>Home</span>
                    {/* </NavLink> */}
                </Menu.Item>
                <Menu.Item key="basic">
                    <PicCenterOutlined />
                    <span>Basic Data</span>
                </Menu.Item>
                <Menu.Item key="master">
                    <ApartmentOutlined />
                    <span>Master Data</span>
                </Menu.Item>
                <div style={{ margin: "20px 10px", height: 2, background: "#fff" }}></div>
                {moduleMenu && Object.keys(moduleMenu).map(menu => (
                    <Menu.Item key={moduleMenu[menu].MenuParams}>
                        {IconGenarator(moduleMenu[menu].IconName)}
                        <span>{moduleMenu[menu].AHead}</span>
                    </Menu.Item>
                ))}
            </Menu>
      </Sider>
    )
}

export default MainDrawer

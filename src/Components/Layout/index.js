import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Layout } from "antd";

import Navbar from "./Navbar";
import AppDrawer from "./AppDrawer";

import { fetchMenu } from "../../Store/menu";


const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: "100vh",
        height: "100vh",
    },
    body: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const LayoutModel = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    const [collapse, setCollapse] = useState(true);
    const [isSideDrawerActive, setSideDrawerActive] = useState(false);
  
    const modulesMenuCollapseHandler = () => {
        setCollapse(!collapse);
        setSideDrawerActive(false);
    };
    
    return (
        <Layout className={classes.root}>
            <Navbar collapse={collapse} collapseHandler={modulesMenuCollapseHandler} isSideDrawerActive={isSideDrawerActive}/>
            <Layout className={classes.body}>
                <AppDrawer values={{collapse, setCollapse, isSideDrawerActive, setSideDrawerActive}}/>
                <Layout>
                    {props.children}
                </Layout>
                {/* <div style={{marginTop: '7.5rem'}}>
                </div> */}
            </Layout>
        </Layout>
    );
};

export default LayoutModel;

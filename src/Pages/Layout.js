import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Layout } from "antd";

import Header from "../Components/Layout/Header";
import AppDrawer from "../Components/Layout/AppDrawer/index";

import { fetchMenu } from "../Store/menu";


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

    return (
        <Layout className={classes.root}>
            <AppDrawer/>
            <Layout className={classes.body}>
                <Header/>
                <div style={{marginTop: '7.5rem'}}>
                    {props.children}
                </div>
            </Layout>
        </Layout>
    );
};

export default LayoutModel;

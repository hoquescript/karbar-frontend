import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { BellOutlined } from "@ant-design/icons";

import logo from '../../../../../Assets/logo-color.png'
import ActionCard from "./action";
import Notifier from "./notifier";


const useStyles = makeStyles({
    list: {
        width: '36rem',
        padding: '1rem 1.5rem'
    },
    fullList: {
        width: "auto"
    },
    logo: {
        height: '4.5rem',
    }
});

const Notification = ({style}) => {
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    const toggleDrawer = open => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState(open);
    };

    const list = anchor => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom"
            })}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{margin: '1rem auto', textAlign:'center'}}>
                <img src={logo} alt="Logo" className={classes.logo}/>
            </div>
            <div style={{marginTop: '3rem'}}>
                <ActionCard/>
                <Notifier/>
            </div>
        </div>
    );

    return (
        <div>
            <IconButton onClick={toggleDrawer(true)}>
                <BellOutlined className={style} />
            </IconButton>
            <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
                {list("right")}
            </Drawer>
        </div>
    );
};

export default Notification;

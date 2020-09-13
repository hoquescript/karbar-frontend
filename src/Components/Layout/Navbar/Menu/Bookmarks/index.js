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
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import logo from '../../../../../Assets/logo-color.png'
import { StarOutlined  } from "@ant-design/icons";

const useStyles = makeStyles({
  list: {
    width: "36rem",
  },
  fullList: {
    width: "auto",
  },
  nested: {
    paddingLeft: 40,
  },
  logo: {
    height: '4.5rem',
  }
});

const modules = [
  {module: 'Accounts Management', children: [
    'Post GL Voucher',
    'Post: Salary',
    'Profit/ Loss'
  ]},
  {module: 'Sales Management', children: [
    'Sell: Garments Item',
    'Sell: Medicine Item',
    'Sell: Fabrics/Plastic Item',
  ]},
  {module: 'HR Management', children: [
    'Employee Increment',
    'Employee Leave',
    'Employee Deputation',
    'Approval: Transfer',
    'Approval: Posting',
  ]},
]
const Bookmarks = ({ style }) => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <div style={{margin: '1rem auto', textAlign:'center'}}>
            <img src={logo} alt="Logo" className={classes.logo}/>
            {/* <h2>Notifications</h2> */}
          </div>
      </List>
      <List>
        {
          modules.map((primary) => (
            <>
              <ListItem button onClick={handleClick} key={primary.module}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={primary.module} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
              {primary.children.map(mod => (
                <List component="div" disablePadding key={mod}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={mod} />
                  </ListItem>
                </List>
              ))}
              </Collapse>
              <Divider />
            </>
          ))
          
        }
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <StarOutlined className={style}/>

      </IconButton>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {list("right")}
      </Drawer>
    </div>
  );
};

export default Bookmarks;

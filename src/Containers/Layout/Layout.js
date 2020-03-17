import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { NavLink } from 'react-router-dom';
import Header from "../../Components/Layout/Header";
import SideDrawer from "../../Components/Layout/SideDrawer";

import { fetchModulesMenu } from "../../Store/Actions/menu"
import Form from "../Form/Form";
import Home from "../Home/Home";

const { Content, Sider } = Layout;

const LayoutModel = props => {
  const modulesMenu = useSelector ( state => state.menu.modulesMenu )

  const [collapse, setCollapse] = useState(true)
  const [subMenuCollapse, setSubMenuCollapse] = useState(false);
  const [key, setKey] = useState(1);
  const [subMenuData, setSubMenuData] = useState({});
  const [isHome,setIsHome] = useState(true)
  const dispatch = useDispatch();

  const modulesMenuCollapseHandler = () => {
    setCollapse(!collapse)
    setSubMenuCollapse(false)
  }

  const subMenuHandler = (item, val) => {
    setCollapse(true)
    // console.log(key, item.key)
    if(item.key == 1){
      setSubMenuCollapse(false);
      setKey(1);
      setIsHome(true)
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

    //Deriving Single Detailed Object of the clicked Module Menu
    if (modulesMenu.length > 0) {
      const module = modulesMenu.find(menu => menu.ACode === item.key)
      setSubMenuData(module);
    }
  };
  useEffect(() => {
    dispatch(fetchModulesMenu());
  },[dispatch]);
  // console.log(key ==)
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header collapse={collapse} collapseMenu={modulesMenuCollapseHandler}/>
      <Layout>
        <Sider collapsed={collapse} width={220}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" onClick={subMenuHandler} >
            <Menu.Item key="1">
              <NavLink to="/">
                <Icon type="home" />
                <span>Home</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              {/* <NavLink to="/bookmarks"> */}
                <Icon type="book" />
                <span>Bookmarks</span>
              {/* </NavLink> */}
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/history">
                <Icon type="history" />
                <span>History</span>
              </NavLink>
            </Menu.Item>
            <div style={{ margin: "20px 10px", height: 2, background: "#fff" }}></div>
            {modulesMenu.map(menu => (
              <Menu.Item key={menu.ACode}>
                <Icon type={menu.IconName} />
                <span>{menu.AHead}</span>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <SideDrawer data={subMenuData} collapsed={subMenuCollapse} setIsHome={setIsHome}/>
        <Layout>
          {isHome ? <Home>{props.children}</Home> : <Form>{props.children}</Form> }
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutModel;

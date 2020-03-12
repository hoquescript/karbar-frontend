import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Layout, Menu, Breadcrumb, Icon } from "antd";

import Header from "../../Components/Layout/Header";
import SideDrawer from "../../Components/Layout/SideDrawer";

import { fetchModulesMenu } from "../../Store/Actions/menu"

const { Content, Sider } = Layout;

const LayoutModel = props => {
  const modulesMenu = useSelector ( state => state.menu.modulesMenu )
  const breadcrumbPathways = useSelector ( state => state.menu.menuPathways )

  const [collapse, setCollapse] = useState(true)
  const [subMenuCollapse, setSubMenuCollapse] = useState(false);
  const [key, setKey] = useState(1);
  const [subMenuData, setSubMenuData] = useState({});
  const dispatch = useDispatch();

  const modulesMenuCollapseHandler = () => {
    setCollapse(!collapse)
    setSubMenuCollapse(false)
  }

  const subMenuHandler = (item, val) => {
    setCollapse(true)
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header collapse={collapse} collapseMenu={modulesMenuCollapseHandler}/>
      <Layout>
        <Sider collapsed={collapse} width={220}>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            onClick={subMenuHandler}
          >
            <Menu.Item key="1">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="book" />
              <span>Bookmarks</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="history" />
              <span>History</span>
            </Menu.Item>
            <div
              style={{ margin: "20px 10px", height: 2, background: "#fff" }}
            ></div>
            {modulesMenu.map(menu => (
              <Menu.Item key={menu.ACode}>
                <Icon type={menu.IconName} />
                <span>{menu.AHead}</span>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <SideDrawer data={subMenuData} collapsed={subMenuCollapse} />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{breadcrumbPathways.first || 'Loading'}</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbPathways.second || '...' }</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbPathways.third || '...' }</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
              {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
    // Store Management /  Forms / GL
  );
};

export default LayoutModel;

import React from "react";
import { Menu, Icon } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { slugStringGenarator } from '../../Constants/StringHelper'
import { menuPathSelection, routeFinding } from '../../Store/Actions/menu'

const { SubMenu } = Menu;

const SideDrawer = ({ data, collapsed, setIsHome, isBasic, isMaster }) => {
  const dispatch = useDispatch()
  const basicMenuData = useSelector ( state => state.menu.basicMenu )
  const masterMenuData = useSelector ( state => state.menu.masterMenu )

  const style = {
    width: collapsed ? 256 : 0,
    transform: collapsed ? "translateX(0)" : "translateX(-400px)",
    transition: "width 0.3s"
  };

  let basicMenu = null, masterMenu = null, formMenu = null, reportMenu = null;

  //Rendering Basic Data
  if(basicMenuData && isBasic && !isMaster){
    basicMenu = basicMenuData.map(dt => (
      <SubMenu key={dt.ACode} title={
          <span>
            <Icon type="form" />
            <span>{dt.AHead}</span>
          </span>
        }        
      > 
      {
        dt.children.length && dt.children.map(data => (
          <Menu.Item key={data.ACode}>
            <NavLink to={`/${slugStringGenarator(data.AHead)}`}>
              {data.AHead}
            </NavLink>
          </Menu.Item>
        ))
      }
      </SubMenu>
    ))
  }

  //Rendering Master Data
  if(masterMenuData && isMaster  && !isBasic){
    masterMenu = masterMenuData.map(dt => (
      <SubMenu key={dt.ACode} title={
          <span>
            <Icon type="form" />
            <span>{dt.AHead}</span>
          </span>
        }        
      > 
      {
        dt.children.length && dt.children.map(data => (
          <Menu.Item key={data.ACode}>
            <NavLink to={`/${slugStringGenarator(data.AHead)}`}>
              {data.AHead}
            </NavLink>
          </Menu.Item>
        ))
      }
      </SubMenu>
    ))
  }

  //Rendering form menu and reports menu
  if(data && !isBasic && !isMaster){
    if (data.formMenu) {
      formMenu = data.formMenu.map(dt => (
          <Menu.Item key={dt.ACode}>
              <NavLink to={`/${slugStringGenarator(dt.AHead)}`}>
                {dt.AHead}
              </NavLink>
          </Menu.Item>
      ));
    }
    if (data.reportMenu) {
      reportMenu = data.reportMenu.map(dt => (
        <Menu.Item key={dt.ACode}>
          <NavLink to={`/${slugStringGenarator(dt.AHead)}`}>
            {dt.AHead}
          </NavLink>
        </Menu.Item>
      ));
    }
  }


  const subMenuHandler = (item) => {
    let thirdMenu =  null;

    if(isBasic){
      const secondACode = item.key.slice(0,4);
      const secondMenu = basicMenuData.find(data => data.ACode === secondACode);
      thirdMenu = secondMenu.children.find(data => data.ACode === item.key)
      dispatch(menuPathSelection('Basic Data', secondMenu.IconName, secondMenu.AHead, thirdMenu.AHead))
    }

    if(isMaster){
      const secondACode = item.key.slice(0,4);
      const secondMenu = masterMenuData.find(data => data.ACode === secondACode);
      thirdMenu = secondMenu.children.find(data => data.ACode === item.key)
      dispatch(menuPathSelection('Master Data', secondMenu.IconName, secondMenu.AHead, thirdMenu.AHead))
    }

    if(!isBasic && !isMaster && (data.formMenu || data.reportMenu)){      
      if(item.key.startsWith('03')){
        thirdMenu = data.formMenu.find(dt => dt.ACode === item.key);       
        dispatch(menuPathSelection(data.AHead, data.IconName, 'Forms', thirdMenu.AHead))
      }
      else if(item.key.startsWith('04')){
        thirdMenu = data.reportMenu.find(dt => dt.ACode === item.key);
        dispatch(menuPathSelection(data.AHead, data.IconName, 'Reports', thirdMenu.AHead))
      }   
    }

    const slugStr = slugStringGenarator(thirdMenu.AHead)
    dispatch(routeFinding(slugStr,thirdMenu.MenuParams))
    setIsHome(false)
  }
  if(isBasic){
    return (
      <Menu style={style} mode="inline" onClick={subMenuHandler}>
        {basicMenu}
      </Menu>
    ) 
  }
  if(isMaster){
    return (
      <Menu style={style} mode="inline" onClick={subMenuHandler}>
        {masterMenu}
      </Menu>
    ) 
  }
  
  return (
    <Menu style={style} mode="inline" defaultOpenKeys={['form', 'report']} onClick={subMenuHandler}>
        <SubMenu key="form" title={
            <span>
              <Icon type="form" />
              <span>Forms</span>
            </span>
          }        
        >
          {formMenu}
        </SubMenu>
        <SubMenu key="report" title={
            <span>
              <Icon type="copy" />
              <span>Reports</span>
            </span>
          }
        >
          {reportMenu}
        </SubMenu>
    </Menu>
  );
};

export default SideDrawer;

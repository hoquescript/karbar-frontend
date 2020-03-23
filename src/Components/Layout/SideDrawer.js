import React from "react";
import { Menu, Icon } from "antd";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { slugStringGenarator } from '../../Constants/StringHelper'
import { menuPathSelection, routeFinding } from '../../Store/Actions/menu'

const { SubMenu } = Menu;

const SideDrawer = ({ data, collapsed, setIsHome }) => {

  const style = {
    width: collapsed ? 256 : 0,
    transform: collapsed ? "translateX(0)" : "translateX(-400px)",
    transition: "width 0.3s"
  };

  //Rendering form menu and reports menu
  let formMenu = null,
  reportMenu = null;
  if(data){
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


  const dispatch = useDispatch()
  const subMenuHandler = (item) => {
    if(data.formMenu || data.reportMenu){      
      //Genarating slug of third level menu 
      let thirdMenu =  null;
      if(item.key.startsWith('03')){
        thirdMenu = data.formMenu.find(dt => dt.ACode === item.key);       
        dispatch(menuPathSelection(data.AHead, data.IconName, 'Forms', thirdMenu.AHead))
      }
      else if(item.key.startsWith('04')){
        thirdMenu = data.reportMenu.find(dt => dt.ACode === item.key);
        dispatch(menuPathSelection(data.AHead, data.IconName, 'Reports', thirdMenu.AHead))
      }   

      //Genarating
      const slugStr = slugStringGenarator(thirdMenu.AHead)
      // const componentStr = componentStringGenarator(thirdMenu.AHead) 
      // console.log(thirdMenu)
      dispatch(routeFinding(slugStr,thirdMenu.MenuParams,thirdMenu.DisplayField))
      setIsHome(false)
    }
  }

  return (
    <Menu style={style} defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1","sub2"]} mode="inline" onClick={subMenuHandler}>
      <SubMenu key="sub1" title={
          <span>
            <Icon type="form" />
            <span>Forms</span>
          </span>
        }        
      >
        {formMenu}
      </SubMenu>
      <SubMenu key="sub2" title={
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

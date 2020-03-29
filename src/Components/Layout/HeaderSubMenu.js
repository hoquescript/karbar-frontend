import React from "react";
import { useSelector } from "react-redux"
import { Menu } from "antd";
const {Item, SubMenu } = Menu;

const HeaderSubMenu = () => {
  const basicMenu = useSelector ( state => state.menu.basicMenu )
  return (
    <Menu>
      {basicMenu.map(menu => {
        if(menu.children.length){
          return (
            <SubMenu title={menu.AHead}>
              {menu.children.map(item => (
                <Item>{item.AHead}</Item>
              ))}
            </SubMenu>
          )
        }
        else{
          return <Item>{menu.AHead}</Item>
        }
      })}
    </Menu>
  );
};

export default HeaderSubMenu;

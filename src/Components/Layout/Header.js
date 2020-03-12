import React from "react";
import styled from "styled-components";
import logo from "../../Assets/logo-color.png";
import HeaderSubMenu from "./HeaderSubMenu";
import { Menu, Icon, Dropdown, Input, Row, Col } from "antd";
const { SubMenu } = Menu;

const HeaderMenu = props => {
  const handleButtonClick = () => {

  }
  return (
    <Layout>
      <MenuCollapse onClick={props.collapseMenu} style={props.collapse ? {minWidth: 80} : {minWidth: 220}}>
        <Icon style={{ fontSize: 25, color: "#fff" }} type={props.collapse ? "menu-unfold" : "menu-fold"} />
      </MenuCollapse>

      <Menubar>
        <LogoWrapper>
          <Logo src={logo} alt="Logo of Dot Bangladesh" />
        </LogoWrapper>

        <SearchBoxWrapper>
          <Input.Search
            placeholder="Search Menu"
            onSearch={value => console.log(value)}
            enterButton
            style= {{width: 600, borderRadius: 25}}
            size="large"
            allowClear={true}
          />
        </SearchBoxWrapper>

        <SettingsMenuWrapper>
          <Dropdown  overlay={<HeaderSubMenu/>} onClick={handleButtonClick} overlay={<HeaderSubMenu/>} trigger={["hover","click"]}>
            <a className="ant-dropdown-link" href="#">
              <IconWrapper>
                <Icon style={{ fontSize: 25 }} type="setting" />
              </IconWrapper>
            </a>
          </Dropdown>
          <Dropdown overlay={<HeaderSubMenu/>} trigger={["click"]} style={{marginLeft: 5}}>
            <a className="ant-dropdown-link" href="#">
              <IconWrapper>
                <Icon style={{ fontSize: 25 }} type="bell" />
              </IconWrapper>
            </a>
          </Dropdown>
          <Dropdown  overlay={<HeaderSubMenu/>} trigger={["click"]} style={{marginLeft: 5}}>
            <a className="ant-dropdown-link" href="#">
              <IconWrapper>
                <Icon style={{ fontSize: 25 }} type="github" />
              </IconWrapper>
            </a>
          </Dropdown>
        </SettingsMenuWrapper>
      </Menubar>
    </Layout>
  );
};

const Layout = styled.div`
  height: 75px;
  background-color: #fff;
  display: flex;
`;

const MenuCollapse = styled.div`
  background-color: #002140;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menubar = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 265px;
`;

const Logo = styled.img`
  height: 40px;
`;

const SearchBoxWrapper = styled.div`
  flex-grow:5;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SettingsMenuWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow:2;
`;

const IconWrapper = styled.div`
  padding: 10px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`


export default HeaderMenu;

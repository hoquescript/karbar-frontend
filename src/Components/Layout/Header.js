import React from "react";
import styled from "styled-components";
import logo from "../../Assets/logo-color.png";
import { Icon, Dropdown, Input } from "antd";
import Profile from "./HeaderMenu/Profile";
import Notification from "./HeaderMenu/Notifcation";
import Settings from "./HeaderMenu/Settings";
import { makeStyles } from '@material-ui/core/styles';
import Bookmarks from "./HeaderMenu/Bookmarks";
import Searchbar from "./Searchbar/Searchbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));


const HeaderMenu = props => {
  const classes = useStyles();
  return (
    <Layout>
      <MenuCollapse onClick={props.collapseMenu} style={props.collapse ? {minWidth: 80} : {minWidth: 220}}>
        <Icon style={{ fontSize: 25, color: "#fff" }} type={props.collapse ? "menu-unfold" : "menu-fold"} />
      </MenuCollapse>

      <Menubar style={{borderBottom: '2px solid #eee'}}>
        <LogoWrapper>
          <Logo src={logo} alt="Logo of Dot Bangladesh" />
        </LogoWrapper>
        
        <Searchbar/>

        <IconWrapper>
          <Bookmarks/>
          <Notification/>
          <Settings/>
          <Profile/>
        </IconWrapper>
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
  /* flex-grow: 1; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 265px; */
`;

const Logo = styled.img`
  height: 40px;
`;

const SearchBoxWrapper = styled.div`
  /* flex-grow:5; */
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SettingsMenuWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* flex-grow:2; */
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

{/* <SettingsMenuWrapper>
<Dropdown overlay={<HeaderSubMenu/>} onClick={handleButtonClick} trigger={["hover","click"]}>
    <IconWrapper>
      {IconGenarator('Home')}
    </IconWrapper>
</Dropdown>
<Dropdown overlay={<HeaderSubMenu/>} trigger={["click"]} style={{marginLeft: 5}}>
    <IconWrapper>
      <Icon style={{ fontSize: 25 }} type="bell" />
    </IconWrapper>
</Dropdown>
<Dropdown  overlay={<HeaderSubMenu/>} trigger={["click"]} style={{marginLeft: 5}}>
    <IconWrapper>
      <Icon style={{ fontSize: 25 }} type="github" />
    </IconWrapper>
</Dropdown>
</SettingsMenuWrapper> */}

import React from "react";
import { Menu, Icon } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { slugStringGenarator, tabMenuFormatter } from '../../Constants/StringHelper'
import { menuPathSelection, routeFinding } from '../../Store/Actions/menu'

const { SubMenu } = Menu;

const useStyles = makeStyles(theme => ({
  root: {
    width: props => props.collapsed ? '280px' : 0,
    // transform: props => props.collapsed ? "translateX(0)" : "translateX(-400px)",
    // display: props => props.collapsed ? "block" : "none",
    transition: "width 0.3s",
    maxHeight: "calc(100vh-75px)",
    overflow: "hidden auto",
    backgroundColor: theme.palette.drawer.side.background,
    borderRight: `1px solid ${theme.palette.grey[1000]}`,
  },
  sideDrawer: {
    background: theme.palette.drawer.side.headBackground,
    color: theme.palette.drawer.side.headText,
    '& ul':{
      background: `${theme.palette.drawer.side.background} !important`,
      '& a':{
        color: theme.palette.drawer.side.menuText,
        transition: 'all 400ms cubic-bezier(0.25,0.8,0.25,1)',
        '&:hover': {
          color: theme.palette.drawer.side.selectedMenuText
        }
      }
    }
  },
  headMenu: {
    // backgroundColor: 'green'
  },
  icon: {

  }
}));

const SideDrawer = ({ data, collapsed, styles, isBasic, isMaster }) => {
  const classes = useStyles({collapsed});
  const dispatch = useDispatch()
  const basicMenuData = useSelector ( state => state.menu.basicMenu )
  const masterMenuData = useSelector ( state => state.menu.masterMenu )

  const style = {
    // width: collapsed ? '280px' : 0,
    // transform: collapsed ? "translateX(0)" : "translateX(-400px)",
    // transition: "width 0.3s",
    // maxHeight: "calc(100vh-75px)",
    // overflow: "hidden auto"
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
      const [tabButton, tabParams] = tabMenuFormatter(thirdMenu.TabButton);

      dispatch(menuPathSelection('Basic Data', secondMenu.IconName, secondMenu.AHead, thirdMenu.AHead, thirdMenu.MenuButton, tabButton, tabParams ))
    }

    if(isMaster){
      const secondACode = item.key.slice(0,4);
      const secondMenu = masterMenuData.find(data => data.ACode === secondACode);

      thirdMenu = secondMenu.children.find(data => data.ACode === item.key)
      const [tabButton, tabParams] = tabMenuFormatter(thirdMenu.TabButton);

      dispatch(menuPathSelection('Master Data', secondMenu.IconName, secondMenu.AHead, thirdMenu.AHead, thirdMenu.MenuButton, tabButton, tabParams))
    }

    if(!isBasic && !isMaster && (data.formMenu || data.reportMenu)){      
      if(item.key.startsWith('03')){
        thirdMenu = data.formMenu.find(dt => dt.ACode === item.key);
        const tab = tabMenuFormatter(thirdMenu.TabButton);
        if(tab){
          const [tabButton, tabParams] = tab;
          console.log(tabButton)

          dispatch(menuPathSelection(data.AHead, data.IconName, 'Forms', thirdMenu.AHead, thirdMenu.MenuButton, tabButton, tabParams))
        }
      }
      else if(item.key.startsWith('04')){
        thirdMenu = data.reportMenu.find(dt => dt.ACode === item.key);
        const [tabButton, tabParams] = thirdMenu.TabButton && tabMenuFormatter(thirdMenu.TabButton);

        dispatch(menuPathSelection(data.AHead, data.IconName, 'Reports', thirdMenu.AHead, thirdMenu.MenuButton, tabButton, tabParams))
      }    
    }
    //--- firstMenu, icon, secondMenu, thirdMenu, menuButton, tabButton
    // dispatch(menuPathSelection(data.AHead, data.IconName, 'Reports', thirdMenu.AHead, thirdMenu.MenuButton, thirdMenu.TabButton));

    const slugStr = slugStringGenarator(thirdMenu.AHead)
    dispatch(routeFinding(slugStr,thirdMenu.MenuParams))
  }
  if(isBasic){
    return (
      <Menu className={classes.root} mode="inline" onClick={subMenuHandler}>
        {basicMenu}
      </Menu>
    ) 
  }
  if(isMaster){
    return (
      <Menu className={classes.root} mode="inline" onClick={subMenuHandler}>
        {masterMenu}
      </Menu>
    ) 
  }
  return (
    <Menu className={classes.root} mode="inline" defaultOpenKeys={['form', 'report']} onClick={subMenuHandler}>
        <SubMenu key="form" title={
            <span className={classes.headMenu}>
              <Icon type="form" className={classes.icon}/>
              <span>Forms</span>
            </span>
          } 
          className={classes.sideDrawer}
        >
          {formMenu}
        </SubMenu>
        <SubMenu key="report" title={
            <span>
              <Icon type="copy" className={classes.icon}/>
              <span>Reports</span>
            </span>
          }
          className={classes.sideDrawer}
        >
          {reportMenu}
        </SubMenu>
    </Menu>
  );
};

export default SideDrawer;

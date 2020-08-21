import React from "react";
import { Menu, Icon } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectMenu } from '../../../../Store/menu'
import { setBreadcrumb, setUrlPath } from '../../../../Store/interface'
import { slugStringGenarator } from '../../../../Constants/StringHelper'

const { SubMenu } = Menu;

const useStyles = makeStyles(theme => ({
  root: {
    width: props => props.collapsed ? '280px' : 0,
    // transform: props => props.collapsed ? "translateX(0)" : "translateX(-400px)",
    // display: props => props.collapsed ? "block" : "none",
    transition: "width 0.3s",
    maxHeight: "calc(100vh - 7.5rem)",
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
}));

const SideDrawer = ({ data, collapsed, primaryModule, isBasic, isMaster }) => {
  const classes = useStyles({collapsed});
  const dispatch = useDispatch()
  
  const allMenu = useSelector ( state => state.menu.allMenu )

  const subMenuHandler = (item) => {
    const [tertiaryModule, secondaryModule] = item.keyPath;

    if(primaryModule === "basic" || primaryModule === "master"){
        dispatch(selectMenu({selectedMenu: {...allMenu[primaryModule][secondaryModule].children[tertiaryModule]}}))
        dispatch(setBreadcrumb({
            breadCrumb: {
                icon: 'form',
                primary: `${primaryModule.charAt(0).toUpperCase() + primaryModule.slice(1)} Data`,
                secondary: allMenu[primaryModule][secondaryModule].AHead,
                tertiary: allMenu[primaryModule][secondaryModule].children[tertiaryModule].AHead
            }
        }))
        dispatch(setUrlPath({path: slugStringGenarator(allMenu[primaryModule][secondaryModule].children[tertiaryModule].AHead)}))
    }
    else{
        dispatch(selectMenu({selectedMenu: {...allMenu.module[primaryModule][`${secondaryModule}Menu`][tertiaryModule]}}))
        dispatch(setBreadcrumb({
            breadCrumb: {
                icon: allMenu.module[primaryModule].IconName,
                primary: allMenu.module[primaryModule].AHead,
                secondary: `${secondaryModule.charAt(0).toUpperCase() + secondaryModule.slice(1)}s`,
                tertiary: allMenu.module[primaryModule][`${secondaryModule}Menu`][tertiaryModule].AHead
            }
        }))
        dispatch(setUrlPath({path: slugStringGenarator(allMenu.module[primaryModule][`${secondaryModule}Menu`][tertiaryModule].AHead)}))
    }
    // let thirdMenu =  null;
    // if(isBasic){
    //   const secondACode = item.key.slice(0,4);
    //   const secondMenu = basicMenuData.find(data => data.ACode === secondACode);

    //   thirdMenu = secondMenu.children.find(data => data.ACode === item.key)
    //   const [tabButton, tabParams] = tabMenuFormatter(thirdMenu.TabButton);

    //   dispatch(menuPathSelection('Basic Data', secondMenu.IconName, secondMenu.AHead, thirdMenu.AHead, thirdMenu.MenuButton, tabButton, tabParams ))
    // }

    // if(isMaster){
    //   const secondACode = item.key.slice(0,4);
    //   const secondMenu = masterMenuData.find(data => data.ACode === secondACode);

    //   thirdMenu = secondMenu.children.find(data => data.ACode === item.key)
    //   const [tabButton, tabParams] = tabMenuFormatter(thirdMenu.TabButton);

    //   dispatch(menuPathSelection('Master Data', secondMenu.IconName, secondMenu.AHead, thirdMenu.AHead, thirdMenu.MenuButton, tabButton, tabParams))
    // }

    // if(!isBasic && !isMaster && (data.formMenu || data.reportMenu)){      
    //   if(item.key.startsWith('03')){
    //     thirdMenu = data.formMenu.find(dt => dt.ACode === item.key);
    //     const tab = tabMenuFormatter(thirdMenu.TabButton);
    //     if(tab){
    //       const [tabButton, tabParams] = tab;
    //       console.log(tabButton)

    //       dispatch(menuPathSelection(data.AHead, data.IconName, 'Forms', thirdMenu.AHead, thirdMenu.MenuButton, tabButton, tabParams))
    //     }
    //   }
    //   else if(item.key.startsWith('04')){
    //     thirdMenu = data.reportMenu.find(dt => dt.ACode === item.key);
    //     const [tabButton, tabParams] = thirdMenu.TabButton && tabMenuFormatter(thirdMenu.TabButton);

    //     dispatch(menuPathSelection(data.AHead, data.IconName, 'Reports', thirdMenu.AHead, thirdMenu.MenuButton, tabButton, tabParams))
    //   }    
    // }
    // //--- firstMenu, icon, secondMenu, thirdMenu, menuButton, tabButton
    // // dispatch(menuPathSelection(data.AHead, data.IconName, 'Reports', thirdMenu.AHead, thirdMenu.MenuButton, thirdMenu.TabButton));

    // const slugStr = slugStringGenarator(thirdMenu.AHead)
    // dispatch(routeFinding(slugStr,thirdMenu.MenuParams))
  }

  if(primaryModule === "basic" || primaryModule === "master"){
    const secondaryModule = allMenu[primaryModule]
    return (
      <Menu className={classes.root} mode="inline" onClick={subMenuHandler}>
        {secondaryModule && Object.keys(secondaryModule).map(module => (
            <SubMenu key={secondaryModule[module].MenuParams} title={
                <span>
                    <Icon type="form" />
                    <span>{secondaryModule[module].AHead}</span>
                </span>
                }        
            > 
            {
                Object.keys(secondaryModule[module].children).map(data => {
                    const tertiaryModule = secondaryModule[module].children[data];
                    return (
                        <Menu.Item key={tertiaryModule.MenuParams}>
                            <NavLink to={`/${slugStringGenarator(tertiaryModule.AHead)}`}>
                            {tertiaryModule.AHead}
                            </NavLink>
                        </Menu.Item>
                    )
                })
            }
            </SubMenu>
        ))}
      </Menu>
    ) 
  }
  else{
    const menuRender = (items) => (
        Object.keys(items).map(item => (
            <Menu.Item key={items[item].MenuParams}>
                <NavLink to={`/${slugStringGenarator(items[item].AHead)}`}>
                    {items[item].AHead}
                </NavLink>
            </Menu.Item>
        ))
    )
    return (
        <Menu className={classes.root} mode="inline" defaultOpenKeys={['form', 'report']} onClick={subMenuHandler}>
            <SubMenu className={classes.sideDrawer} key="form" title={
                <span className={classes.headMenu}>
                    <Icon type="form" className={classes.icon}/>
                    <span>Forms</span>
                </span>
            }>
                {allMenu.module[primaryModule] && menuRender(allMenu.module[primaryModule].formMenu)}
            </SubMenu>
            <SubMenu key="report" className={classes.sideDrawer} title={
                <span>
                    <Icon type="copy" className={classes.icon}/>
                    <span>Reports</span>
                </span>
            }>
                {allMenu.module[primaryModule] && menuRender(allMenu.module[primaryModule].reportMenu)}
            </SubMenu>
        </Menu>
    );
    }

};

export default SideDrawer;

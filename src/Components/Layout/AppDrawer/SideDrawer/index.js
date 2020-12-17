import React from "react";
import { Menu, Icon } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectMenu } from '../../../../Store/menu'
import { setBreadcrumb, setUrlPath } from '../../../../Store/interface'
import { slugStringGenarator } from '../../../../Constants/StringHelper'
import IconGenarator from "../../../Util/IconGenarator/IconGenarator";
import { resetFormState } from "../../../../Store/form";


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
      '& li.ant-menu-item-selected': {
        background: `${theme.palette.drawer.side.selectedMenuBackground} !important`,
      },
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
  console.log(primaryModule)
  const allMenu = useSelector ( state => state.menu.allMenu )

  const subMenuHandler = (item) => {
    const [tertiaryModule, secondaryModule] = item.keyPath;
    if(primaryModule === "home"){
      const mainModule = allMenu.module[item.key]
      dispatch(selectMenu({selectedMenu: mainModule}))
      dispatch(setBreadcrumb({
        breadCrumb: {
            icon: mainModule.IconName,
            primary: 'Home',
            secondary: 'Dashboard',
            tertiary: mainModule.AHead
        }
      }))
      dispatch(setUrlPath({path: `${slugStringGenarator(mainModule.AHead)}`}))

      //Resetting Form Beacause going to home page
      dispatch(resetFormState())
    }
    else if(primaryModule === "basic" || primaryModule === "master"){
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
        console.log(slugStringGenarator(allMenu.module[primaryModule][`${secondaryModule}Menu`][tertiaryModule].AHead))
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
  }
  const menuRender = (items, init) => (
    Object.keys(items).map(item => (
        <Menu.Item key={items[item].MenuParams}>
          
          {/* Route for developement with all selected Menu info */}
          {process.env.REACT_APP_BASE_URL === "development" && (
            <NavLink to={
              `${init ? `/${init}` : ''}/${slugStringGenarator(items[item].AHead)}/CCode=${items[item].ClientCode}/MCode=${items[item].ModuleCode}/ACode=${items[item].ACode}/MenuParams=${items[item].MenuParams}/MenuType=${items[item].MenuType}`}
            >
              {items[item].IconName && IconGenarator(items[item].IconName)}
              {items[item].AHead}
            </NavLink>
          )}

          {/* Production Level URL/ Need to modify further like form/form_name or report/form_name */}
          {process.env.REACT_APP_BASE_URL === "production" && (
            <NavLink to={`${init ? `/${init}` : ''}/${slugStringGenarator(items[item].AHead)}`}>
              {items[item].IconName && IconGenarator(items[item].IconName)}
              {items[item].AHead}
            </NavLink>
          )}
        </Menu.Item>
    ))
  )
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
    return (
        <Menu className={classes.root} mode="inline" defaultOpenKeys={['home', 'form', 'report']} onClick={subMenuHandler}>
            <SubMenu className={classes.sideDrawer} key={primaryModule === "home" ? "home" : "form"} title={
                <span className={classes.headMenu}>
                    <Icon type="form" className={classes.icon}/>
                    <span>{primaryModule === "home" ? "Dashboard" : "Forms"}</span>
                </span>
            }>
                {primaryModule === "home" ? 
                  allMenu.module && menuRender(allMenu.module, 'dashboard') :
                  allMenu.module[primaryModule] && menuRender(allMenu.module[primaryModule].formMenu)
                }
            </SubMenu>
            {
              primaryModule === "home" ? null : (
              <SubMenu key="report" className={classes.sideDrawer} title={
                  <span>
                      <Icon type="copy" className={classes.icon}/>
                      <span>Reports</span>
                  </span>
              }>
                  {allMenu.module[primaryModule] && menuRender(allMenu.module[primaryModule].reportMenu)}
              </SubMenu>
            )}
        </Menu>
    );
    }

};

export default SideDrawer;

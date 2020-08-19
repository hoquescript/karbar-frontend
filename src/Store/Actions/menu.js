import {
  INITIATE_FETCH_MODULES_MENU,
  FETCH_BASIC_MENU,
  FETCH_MASTER_MENU,
  FETCH_MODULES_MENU,
  MENU_PATH_SELECTION,
  ROUTE_FINDING,
  RESET_TAB_MENU_PROPERTY
} from "./actionTypes";

export const fetchModulesMenu = () => ({
  type: INITIATE_FETCH_MODULES_MENU
});

export const storeBasicMenu = (basicMenu) => ({
  type: FETCH_BASIC_MENU,
  basicMenu
});

export const storeMasterMenu = (masterMenu) => ({
  type: FETCH_MASTER_MENU,
  masterMenu
});

export const storeModulesMenu = (modulesMenu) => ({
  type: FETCH_MODULES_MENU,
  modulesMenu
});

export const menuPathSelection = (firstMenu, icon, secondMenu, thirdMenu, menuButton, tabButton, tabParams) => ({
  type: MENU_PATH_SELECTION,
  firstMenu,
  icon,
  secondMenu,
  thirdMenu,
  menuButton,
  tabButton,
  tabParams
});

export const routeFinding = (path, menuParams,displayField) => ({
  type: ROUTE_FINDING,
  path,
  menuParams,
});

export const resetTabMenuProperty = () => ({
  type: RESET_TAB_MENU_PROPERTY
});
